import styled from "@emotion/styled";
import TranslateStarter from "./TranslateStarter";
import { useEffect, useRef, useState } from "react";
import apiRequest from "@/shared/api/apiRequest";
import { MODEL } from "../translate.consts";
import TranslateSessionView from "./TranslateSessionView";
import useToggle from "@/shared/lib/useToggle";
import FinishTranslationModal from "./modal/FinishTranslationModal";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { promptUpdate } from "../lib/promptUpdate";
import LoadingModal from "./modal/LoadingModal";
import { ChatMessage } from "../translate.types";

export default function TranslateController() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const languageCode = i18n.language; // 현재 언어 코드 가져오기

  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]); // 실제 화면에 보여줄 메시지 배열

  const pendingTranscriptRef = useRef<string | null>(null); // STT된 원문을 임시로 보관하기 위한 ref
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioTrackRef = useRef<MediaStreamTrack | null>(null);

  const { isOpen: isFinishModalOpen, toggle: finishModalToggle } = useToggle(); // 통역 중지 모달 토글 훅
  const { isOpen: isLoadingModalOpen, toggle: loadingModalToggle } =
    useToggle(); // 로딩 모달 토글 훅

  // Function to send conversation.item.delete
  const deleteChatItem = (itemId: string) => {
    if (!dcRef.current || dcRef.current.readyState !== "open" || !itemId) {
      console.warn(
        "[WARN] deleteChatItem aborted. DataChannel not open or item_id missing."
      );
      return;
    }
    const payload = {
      type: "conversation.item.delete",
      item_id: itemId,
    };
    try {
      dcRef.current.send(JSON.stringify(payload));
      console.log(`🗑️ Sent conversation.item.delete request:`, itemId);
    } catch (e) {
      console.error("❌ Error sending conversation.item.delete:", e);
    }
  };

  // 메시지 이벤트 처리
  const handleDataChannelMessage = (event: MessageEvent) => {
    try {
      const msg = JSON.parse(event.data);

      if (msg.type === "session.updated") {
        // console.log(
        //   "✅ session.updated received. Latest settings:",
        //   msg.session
        // );
        return;
      }

      if (msg.type === "conversation.item.deleted") {
        // console.log("✅ item deleted successfully:", msg.item_id);
        return;
      }

      // 사용자 STT(음성 -> 텍스트) 완료 시
      if (
        msg.type === "conversation.item.input_audio_transcription.completed"
      ) {
        const text = (msg.transcript || "").trim();
        if (!text) return;

        pendingTranscriptRef.current = text; // 임시로 저장
        console.log("▶ STT 완료:", text);

        // 번역 지침 갱신
        if (dcRef.current && dcRef.current.readyState === "open") {
          promptUpdate(dcRef.current, languageCode);
        } else {
          console.warn(
            "[WARN] Cannot send session.update. DataChannel not open or available."
          );
        }

        if (msg.item_id) {
          deleteChatItem(msg.item_id);
        }
        return;
      }

      // 번역 완료
      if (msg.type === "response.audio_transcript.done") {
        const trans = (msg.transcript || "").trim();
        // 번역 결과가 없거나 STT 원문이 없으면 무시
        if (!trans) return;

        // 한글 포함 여부 검사 (자모 + 완성형)
        const isKorean = /[\u3131-\u318E\uAC00-\uD7A3]/.test(
          pendingTranscriptRef.current!
        );

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            speaker: isKorean ? "doctor" : "user",
            original: pendingTranscriptRef.current as string,
            translation: trans,
          },
        ]);

        pendingTranscriptRef.current = null; // 다음 사이클을 위해 초기화

        console.log("▶ 번역 완료:", trans);

        if (msg.item_id) {
          deleteChatItem(msg.item_id);
        }
        return;
      }
    } catch (error) {
      console.error("Error processing DataChannel message:", error);
    }
  };

  // 통역 시작
  const handleStartTranslate = async () => {
    loadingModalToggle(); // 로딩 모달 열기

    try {
      const data = await apiRequest({
        url: `/session/${languageCode}`,
        method: "POST",
      });

      const EPHEMERAL_KEY = data.data.client_secret.value; //임시 키 발급

      const newPc = new RTCPeerConnection();
      pcRef.current = newPc; // 마이크 오디오 트랙 추가

      // 마이크 트랙 가져와서 우선
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const newAudioTrack = mediaStream.getAudioTracks()[0];
      newAudioTrack.enabled = false; // 초기에는 음소거 상태로 설정
      audioTrackRef.current = newAudioTrack;
      newPc.addTrack(newAudioTrack, mediaStream); // 응답 오디오 출력 설정

      // (기존) 오디오 출력 설정
      const audioEl = document.createElement("audio");
      audioEl.autoplay = true;
      newPc.ontrack = (event) => {
        audioEl.srcObject = event.streams[0];
      };

      // DataChannel 생성
      const newDc = newPc.createDataChannel("oai-events");
      dcRef.current = newDc;

      newDc.onmessage = handleDataChannelMessage; // Attach message handler

      // DataChannel open 시점에 "준비 완료"
      newDc.onopen = () => {
        console.log("▶️ DataChannel open");
        promptUpdate(newDc, languageCode); // 초기 지침 전송

        // 첫 문장 정확도를 위해 3초 로딩 더 주기
        setTimeout(() => {
          // 마이크 트랙을 활성화해서 음성이 전송되도록 함
          if (audioTrackRef.current) {
            audioTrackRef.current.enabled = true;
          }
          // 로딩 모달 닫고, 화면 전환(세션 뷰 렌더) 시작
          loadingModalToggle();
          setIsTranslating(true);
        }, 3000);
      };

      newDc.onclose = () => {
        console.log("▶️ DataChannel closed");
      };

      newDc.onerror = (err) => {
        console.error("❌ DataChannel error:", err);
      };

      // SDP Offer 생성 및 전송
      const offer = await newPc.createOffer();
      await newPc.setLocalDescription(offer);

      const sdpResponse = await fetch(
        `${import.meta.env.VITE_OPEN_API_URL}?${MODEL}`,
        {
          method: "POST",
          body: offer.sdp,
          headers: {
            Authorization: `Bearer ${EPHEMERAL_KEY}`,
            "Content-Type": "application/sdp",
            "OpenAI-Beta": "realtime=v1",
          },
        }
      );

      if (!sdpResponse.ok) {
        throw new Error(
          `SDP exchange failed: ${
            sdpResponse.status
          } ${await sdpResponse.text()}`
        );
      }

      const answerSdp = await sdpResponse.text();
      if (!answerSdp) {
        throw new Error("SDP answer was empty.");
      }
      const answer: RTCSessionDescriptionInit = {
        type: "answer",
        sdp: answerSdp,
      };
      await newPc.setRemoteDescription(answer);
      console.log("✅ WebRTC 연결 완료"); // 상태 저장
    } catch (error) {
      console.error("❌ 통역 시작 오류:", error);
      alert(
        `Failed to start translation: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      // 실패 시 클린업
      if (audioTrackRef.current) audioTrackRef.current.stop();
      if (pcRef.current) pcRef.current.close();
      if (dcRef.current) dcRef.current.close();

      setIsTranslating(false);
      loadingModalToggle();
    }
  };

  // 통역 종료
  const handleFinishTranslate = () => {
    setIsTranslating(false); // UI 반응 먼저

    if (dcRef.current) {
      // Use ref for cleanup
      try {
        dcRef.current.close();
      } catch (e) {
        console.warn("DataChannel close error during finish:", e);
      }
    }

    if (pcRef.current) {
      // Use ref for cleanup
      try {
        pcRef.current.getSenders().forEach((sender) => {
          if (sender.track) sender.track.stop(); // 마이크 트랙 정리
        });
        pcRef.current.close();
      } catch (e) {
        console.warn("PeerConnection close error during finish:", e);
      }
    }

    if (audioTrackRef.current) {
      // Also ensure audio track from ref is stopped
      try {
        audioTrackRef.current.stop();
      } catch (e) {
        console.warn("AudioTrack stop error during finish:", e);
      }
    }

    finishModalToggle();
    navigate("/translate/finish", { replace: true });
  };

  // 음소거 핸들링
  const handleToggleMuted = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioTrackRef.current) {
        // Use ref
        audioTrackRef.current.enabled = !next;
      }
      return next;
    });
  };

  // 컴포넌트 언마운트 시 클린업
  useEffect(() => {
    return () => {
      if (isTranslating) {
        if (dcRef.current) {
          try {
            dcRef.current.close();
            dcRef.current = null;
          } catch (e) {
            console.warn("DC close error on unmount:", e);
          }
        }
        // PeerConnection과 오디오 트랙 정리
        if (pcRef.current) {
          try {
            pcRef.current.getSenders().forEach((sender) => {
              sender.track?.stop();
            });
            pcRef.current.close();
            pcRef.current = null;
          } catch (e) {
            console.warn("PC close error on unmount:", e);
          }
        }

        // MediaStreamTrack 정리 (audioTrackRef might be more reliable here)
        if (audioTrackRef.current) {
          try {
            audioTrackRef.current.stop();
            audioTrackRef.current = null;
          } catch (e) {
            console.warn("Track stop error on unmount:", e);
          }
        }
        setIsTranslating(false);
      }
    };
  }, [isTranslating]);

  return (
    <>
      <Container>
        {/* 통역 중이 아닐 때 (초기 화면) */}
        {!isTranslating && <TranslateStarter onStart={handleStartTranslate} />}

        {/* 통역 중일 때 */}
        {isTranslating && (
          <TranslateSessionView
            isMuted={isMuted}
            toggleMuted={handleToggleMuted}
            finishModalToggle={finishModalToggle}
            messages={messages}
          />
        )}
      </Container>

      {/* 로딩 모달 */}
      <LoadingModal isOpen={isLoadingModalOpen} toggle={loadingModalToggle} />

      {/* 통역 중지 모달 */}
      <FinishTranslationModal
        isOpen={isFinishModalOpen}
        toggle={finishModalToggle}
        finishTranslate={handleFinishTranslate}
      />
    </>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 52px);
`;
