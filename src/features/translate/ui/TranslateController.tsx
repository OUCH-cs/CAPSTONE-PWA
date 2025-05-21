import styled from "@emotion/styled";
import TranslateStarter from "./TranslateStarter";
import { useState } from "react";
import apiRequest from "@/shared/api/apiRequest";
import { MODEL } from "../translate.consts";
import TranslateSessionView from "./TranslateSessionView";
import useToggle from "@/shared/lib/useToggle";
import FinishTranslationModal from "./FinishTranslationModal";

export default function TranslateController() {
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [pc, setPc] = useState<RTCPeerConnection | null>(null);
  const [dc, setDc] = useState<RTCDataChannel | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const { isOpen: isFinishModalOpen, toggle: isFinishModalToggle } =
    useToggle(); // 통역 중지 모달 토글 훅

  const handleStartTranslate = async () => {
    setIsTranslating(true);
    const data = await apiRequest({ url: "/session", method: "POST" });

    const EPHEMERAL_KEY = data.data.client_secret.value; //임시 키 발급

    // PeerConnection 생성
    const pc = new RTCPeerConnection();

    // 마이크 오디오 트랙 추가
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    const audioTrack = mediaStream.getAudioTracks()[0];
    pc.addTrack(audioTrack);

    // 응답 오디오 출력 설정
    const audioEl = document.createElement("audio");
    audioEl.autoplay = true;
    pc.ontrack = (event) => {
      audioEl.srcObject = event.streams[0];
    };

    // DataChannel 생성 및 이벤트 처리
    const dc = pc.createDataChannel("oai-events");
    // dc.onmessage = (event) => {
    // console.log("📨 Realtime API event:", event.data);
    // };

    // SDP Offer 생성 및 전송
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    const sdpResponse = await fetch(
      `${import.meta.env.VITE_OPEN_API_URL}?${MODEL}`,
      {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${EPHEMERAL_KEY}`,
          "Content-Type": "application/sdp",
        },
      }
    );

    const answer: RTCSessionDescriptionInit = {
      type: "answer",
      sdp: await sdpResponse.text(),
    };
    await pc.setRemoteDescription(answer);

    // 상태 저장
    setPc(pc);
    setDc(dc);
  };

  const handleFinishTranslate = () => {
    setIsTranslating(false); // UI 반응 먼저

    if (dc) {
      try {
        dc.close();
      } catch (e) {
        console.warn("DataChannel close error:", e);
      }
      setDc(null);
    }

    if (pc) {
      try {
        pc.getSenders().forEach((sender) => {
          if (sender.track) sender.track.stop(); // 마이크 트랙 정리
        });
        pc.close();
      } catch (e) {
        console.warn("PeerConnection close error:", e);
      }
      setPc(null);
    }

    isFinishModalToggle();
  };

  // 음소거 핸들링
  const handleToggleMuted = () => setIsMuted((prev) => !prev);

  return (
    <>
      <Container>
        {/* 통역 중이 아닐 때 (초기 화면) */}
        {!isTranslating && <TranslateStarter onStart={handleStartTranslate} />}

        {isTranslating && (
          // 통역 중일 때
          <TranslateSessionView
            isMuted={isMuted}
            toggleMuted={handleToggleMuted}
            toggle={isFinishModalToggle}
          />
        )}
      </Container>

      {/* 통역 중지 모달 */}
      <FinishTranslationModal
        isOpen={isFinishModalOpen}
        toggle={isFinishModalToggle}
        finishTranslate={handleFinishTranslate}
      />
    </>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 52px);
  padding-top: 48px;
`;
