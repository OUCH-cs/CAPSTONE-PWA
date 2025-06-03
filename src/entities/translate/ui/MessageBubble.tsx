import styled from "@emotion/styled";
import Profile from "./Profile";

interface MessageBubbleProps {
  speaker: "doctor" | "user";
  original: string;
  translation: string;
}

export function MessageBubble({
  speaker,
  original,
  translation,
}: MessageBubbleProps) {
  const isDoctor = speaker === "doctor";

  return (
    <BubbleContainer side={isDoctor ? "left" : "right"}>
      {isDoctor && <Profile />}

      <Bubble side={isDoctor ? "left" : "right"}>
        <TextLine>{original}</TextLine>
        <Divider>---</Divider>
        <TextLine className="translation">{translation}</TextLine>
      </Bubble>
    </BubbleContainer>
  );
}

const BubbleContainer = styled.div<{ side: "left" | "right" }>`
  display: flex;
  align-items: flex-start;
  margin: 8px 16px;
  gap: 10px;

  /* 왼쪽(의사) vs 오른쪽(사용자) 정렬 */
  justify-content: ${({ side }) =>
    side === "left" ? "flex-start" : "flex-end"};
`;

const Bubble = styled.div<{ side: "left" | "right" }>`
  max-width: 70%;
  background-color: ${({ side }) => (side === "left" ? "#e7f4fc" : "#d1e8ff")};
  border-radius: 12px;
  padding: 12px;
  white-space: pre-wrap;
  word-break: break-word;
  color: #333;

  /* 애니메이션 설정 */
  transform-origin: ${({ side }) =>
    side === "left" ? "left bottom" : "right bottom"};
  animation: pop 0.3s ease-out;

  position: relative;
  &:after {
    content: "";
    position: absolute;
    ${({ side }) =>
      side === "left"
        ? `
        top: 10px;
        left: -8px;
        border-width: 8px 8px 8px 0;
        border-style: solid;
        border-color: transparent #e7f4fc transparent transparent;
      `
        : `
        top: 10px;
        right: -8px;
        border-width: 8px 0 8px 8px;
        border-style: solid;
        border-color: transparent transparent transparent #d1e8ff;
      `}
  }

  @keyframes pop {
    0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const TextLine = styled.div`
  font-size: 14px;
  line-height: 1.4;
  &.translation {
    margin-top: 4px;
    font-size: 13px;
    color: #555;
  }
`;

const Divider = styled.div`
  text-align: center;
  color: #888;
  font-size: 12px;
  margin: 4px 0;
`;
