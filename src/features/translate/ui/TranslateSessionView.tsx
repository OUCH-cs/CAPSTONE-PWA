import useToggle from "@/shared/lib/useToggle";
import styled from "@emotion/styled";
import GuideFunnelModal from "./guide/GuideFunnelModal";
import TranslateSessionHeader from "@/entities/translate/ui/TranslateSessionHeader";
import TranslateSessionOption from "@/entities/translate/ui/TranslateSessionOption";
import ChatView from "./chat/ChatView";
import { ChatMessage } from "../translate.types";

interface TranslateSessionViewProps {
  isMuted: boolean;
  toggleMuted: () => void;
  finishModalToggle: () => void;
  messages: ChatMessage[];
}

export default function TranslateSessionView({
  isMuted,
  toggleMuted,
  finishModalToggle,
  messages,
}: TranslateSessionViewProps) {
  const { isOpen: isFunnelModalOpen, toggle: funnelModalToggle } = useToggle(); // 통역 가이드 퍼널 모달 토글 훅

  return (
    <>
      <Container>
        <TranslateSessionHeader finishModalToggle={finishModalToggle} />

        {/* 통역 채팅 뷰 */}
        <ChatView messages={messages} />

        {/* 가이드 라우팅, 음소거 */}
        <TranslateSessionOption
          funnelModalToggle={funnelModalToggle}
          isMuted={isMuted}
          toggleMuted={toggleMuted}
        />
      </Container>

      {/* 통역 가이드 퍼널 모달 */}
      <GuideFunnelModal
        isOpen={isFunnelModalOpen}
        funnelModalToggle={funnelModalToggle}
        isMuted={isMuted}
        toggleMuted={toggleMuted}
      />
    </>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 70px 0 70px;
`;
