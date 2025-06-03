import styled from "@emotion/styled";
import MuteToggleButton from "./MuteToggleButton";
import GuideRoutingButton from "./GuideRoutingButton";

interface TranslateSessionOptionProps {
  isMuted: boolean;
  toggleMuted: () => void;
  funnelModalToggle: () => void;
}

export default function TranslateSessionOption({
  isMuted,
  toggleMuted,
  funnelModalToggle,
}: TranslateSessionOptionProps) {
  return (
    <Container>
      {/* 가이드 라우팅 버튼 */}
      <GuideRoutingButton toggle={funnelModalToggle} />

      {/* 음소거 버튼 */}
      <MuteToggleButton
        isModalMode={false}
        isMuted={isMuted}
        toggleMuted={toggleMuted}
      />
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  padding: 0 20px;
  background-color: transparent;
`;
