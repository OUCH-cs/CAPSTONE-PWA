import styled from "@emotion/styled";
import Modal from "@/shared/components/modal/Modal";
import GuideFunnel from "./GuideFunnel";
import { useFunnel } from "@/shared/lib/funnel";
import { STEPS } from "../../translate.consts";
import ClosedIcon from "@/shared/assets/common/closed.svg?react";
import MuteToggleButton from "@/entities/translate/ui/MuteToggleButton";

interface GuideFunnelModalProps {
  isOpen: boolean;
  funnelModalToggle: () => void;
  isMuted: boolean;
  toggleMuted: () => void;
}

export default function GuideFunnelModal({
  isOpen,
  funnelModalToggle,
  isMuted,
  toggleMuted,
}: GuideFunnelModalProps) {
  const { Funnel, Step, setStep, currentStep } = useFunnel(STEPS[0]); // 퍼널 렌더링

  return (
    <Modal isOpen={isOpen} toggle={funnelModalToggle}>
      <ModalWrapper>
        {/* 닫기 버튼 */}
        <ClosedIconWrapper onClick={funnelModalToggle}>
          <ClosedIcon />
        </ClosedIconWrapper>

        {/* 음소거 버튼 */}
        <MuteToggleButtonWrapper>
          <MuteToggleButton
            isModalMode={true}
            isMuted={isMuted}
            toggleMuted={toggleMuted}
          />
        </MuteToggleButtonWrapper>

        <GuideFunnel
          steps={STEPS}
          setStep={setStep}
          Funnel={Funnel}
          Step={Step}
          currentStep={currentStep}
          funnelModalToggle={funnelModalToggle}
        />
      </ModalWrapper>
    </Modal>
  );
}

const ModalWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: calc(100vh - 52px);
  background-color: #f5f9fc;
`;

const ClosedIconWrapper = styled.button`
  position: absolute;
  top: 15px;
  left: 5px;
  width: 24px;
  height: 24px;
  background-color: transparent;
  cursor: pointer;
`;

const MuteToggleButtonWrapper = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  width: 52px;
  height: 52px;
`;
