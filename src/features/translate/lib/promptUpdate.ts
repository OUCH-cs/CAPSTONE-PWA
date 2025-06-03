import { getPrompt } from "../translate.consts";

// session.update 메시지를 서버로 전송 (지침 업데이트)
function promptUpdate(dc: RTCDataChannel, languageCode: string) {
  const instructions = getPrompt(languageCode).trim();
  try {
    dc.send(
      JSON.stringify({ type: "session.update", session: { instructions } })
    );
    // console.log("🔄 session.update 전송 완료");
  } catch (e) {
    console.error("❌ session.update 전송 오류:", e);
  }
}

export { promptUpdate };
