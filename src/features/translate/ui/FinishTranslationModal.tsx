import styled from "@emotion/styled";
import Modal from "@/shared/components/modal/Modal";
import theme from "@/shared/styles/theme";

interface FinishTranslationModalProps {
  isOpen: boolean;
  toggle: () => void;
  finishTranslate: () => void;
}

export default function FinishTranslationModal({
  isOpen,
  toggle,
  finishTranslate,
}: FinishTranslationModalProps) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalWarpper>
        <Title>Are you sure you want to finish the interpretation?</Title>

        <ButtonWrapper>
          <CancelButton onClick={toggle}>Cancel</CancelButton>
          <FinishButton onClick={finishTranslate}>Finish</FinishButton>
        </ButtonWrapper>
      </ModalWarpper>
    </Modal>
  );
}

const ModalWarpper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 296px;
  height: 202px;
  padding-top: 66px;
  background-color: ${theme.colors.white};
`;

const Title = styled.p`
  width: 204px;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
`;

const Button = styled.button`
  flex: 1;
  font-size: 14px;
  height: 48px;
`;
const CancelButton = styled(Button)`
  background-color: ${theme.colors.white_f1};
`;
const FinishButton = styled(Button)`
  color: ${theme.colors.white};
  background-color: ${theme.colors.primary};
`;
