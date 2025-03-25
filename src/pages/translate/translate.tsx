import RecordingIndicator from "../../components/translate/RecordingIndicator";
import Button from "../../components/translate/Button";
import { useState } from "react";
import { TRANSLATION_INSTRUCTIONS } from "../../consts/instructions";

export default function TranslatePage() {
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [pc, setPc] = useState<RTCPeerConnection | null>(null);
  const [dc, setDc] = useState<RTCDataChannel | null>(null);

  const handleStartTranslate = async () => {
    setIsTranslating(true);
    const tokenResponse = await fetch(
      `${import.meta.env.VITE_BASE_URL}/sessions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-realtime-preview-2024-12-17",
          modalities: ["audio", "text"],
          instructions: TRANSLATION_INSTRUCTIONS,
        }),
      }
    );
    const data = await tokenResponse.json();
    const EPHEMERAL_KEY = data.client_secret.value; //임시 키 발급

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
      `${
        import.meta.env.VITE_BASE_URL
      }?model=gpt-4o-mini-realtime-preview-2024-12-17`,
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
    <div className="flex flex-col items-center gap-[100px] h-screen pt-[50%]">
      <RecordingIndicator>Recording...</RecordingIndicator>
      <div className="flex gap-[10px]">
        <Button disabled={isTranslating} onClick={handleStartTranslate}>
          Start
        </Button>
        <Button disabled={!isTranslating} onClick={handleStopTranslate}>
          Finish
        </Button>
      </div>
    </div>
  );
}
