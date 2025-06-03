import { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { MessageBubble } from "@/entities/translate/ui/MessageBubble";
import { ChatMessage } from "../../translate.types";

interface ChatViewProps {
  messages: ChatMessage[];
}

export default function ChatView({ messages }: ChatViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 대화가 업데이트될 때마다 스크롤을 맨 아래로 내린다
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ChatContainer ref={scrollRef}>
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          speaker={msg.speaker}
          original={msg.original}
          translation={msg.translation}
        />
      ))}
    </ChatContainer>
  );
}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 100%;
  padding: 16px 8px;
  overflow-y: auto;
  background-color: #f9f9f9;
`;
