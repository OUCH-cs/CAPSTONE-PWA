import RecordingIndicator from "@/features/translate/ui/RecordingIndicator";
import { useState } from "react";
import apiRequest from "@/shared/api/apiRequest";
import { Button } from "@/shared/components/button/Button";
import styled from "@emotion/styled";
import { MODEL } from "@/features/translate/translate.consts";

function TranslatePage() {
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [pc, setPc] = useState<RTCPeerConnection | null>(null);
  const [dc, setDc] = useState<RTCDataChannel | null>(null);

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

  const handleStopTranslate = () => {
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
  };

  return (
    <Container>
      <RecordingIndicator>Recording...</RecordingIndicator>
      <ButtonWrapper>
        <Button
          width={120}
          height={52}
          disabled={isTranslating}
          onClick={handleStartTranslate}
        >
          Start
        </Button>
        <Button
          width={120}
          height={52}
          disabled={!isTranslating}
          onClick={handleStopTranslate}
        >
          Finish
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

export { TranslatePage };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
  height: 100vh;
  padding-top: 50%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
