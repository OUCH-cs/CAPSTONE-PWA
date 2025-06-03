import styled from "@emotion/styled";
import Mic from "@/shared/assets/common/translate-tab.svg?react";
import MicOff from "@/shared/assets/translate/mic-off.svg?react";

interface MuteToggleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isMuted: boolean;
  toggleMuted: () => void;
  isModalMode: boolean;
}

export default function MuteToggleButton({
  isMuted,
  toggleMuted,
  isModalMode,
  ...props
}: MuteToggleButtonProps) {
  return (
    <Container
      {...props}
      $isMuted={isMuted}
      $isModalMode={isModalMode}
      onClick={(e) => {
        toggleMuted();
        (e.currentTarget as HTMLButtonElement).blur();
      }}
    >
      {isMuted ? (
        <MicOff width={24} height={24} />
      ) : (
        <Mic width={24} height={24} />
      )}
    </Container>
  );
}

const Container = styled.button<{ $isMuted: boolean; $isModalMode: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 52px;
  border-radius: ${({ $isModalMode }) =>
    $isModalMode ? "20px 0 0 20px" : "20px"};
  background-color: ${({ theme, $isMuted }) =>
    $isMuted ? theme.colors.white_f1 : theme.colors.white};
  box-shadow: ${({ $isMuted }) =>
    $isMuted
      ? "inset 4px 4px 4px 0px rgba(0, 0, 0, 0.08)"
      : "4px 4px 4px 0px rgba(0, 0, 0, 0.08)"};
`;
