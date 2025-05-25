import * as S from '../common'
import styled from "@emotion/styled";
import SelectDestination from "../SelectDestination";
import { useFormContext } from "react-hook-form";
import { DestinationType, StepProps } from "../../diagnosis.type";
import Modal from '@/shared/components/modal/Modal';
import useToggle from '@/shared/lib/useToggle';
import { useNavigate } from 'react-router-dom';
import theme from '@/shared/styles/theme';
import { Button } from "@/shared/components/button/Button";

const StepOne = ({ onNext}: StepProps) => {
  const navigate = useNavigate();
  const { watch } = useFormContext<{ visitType: DestinationType }>();
  const selectedDestination = watch("visitType") ?? undefined;
  const { isOpen, toggle } = useToggle();

  const handlePrevClick = () => {
    toggle();
    navigate("/")
  };

  return (
    <S.Container>
      <S.Question>Where do you want to go?</S.Question>
      <SelectDestination selectedDestination={selectedDestination} />
      <S.ButtonContainer>
        <S.NavigateButton
          type='button'
          variant = "prev"
          onClick={toggle} 
        >
          <S.ButtonText variant = "prev">Prev</S.ButtonText>
        </S.NavigateButton>
        <S.NavigateButton
          type='button'
          disabled={!selectedDestination}
          onClick={onNext}
        >
          <S.ButtonText>Next</S.ButtonText>
        </S.NavigateButton>
      </S.ButtonContainer>
      <Modal isOpen={isOpen} toggle={toggle}>
        <Wrapper>
          <Message>Do you want to stop<br/>the self-diagnosis?</Message>
          <ButtonGroup>
            <ActionButton onClick={toggle} variant="cancel">
              Cancel
            </ActionButton>
            <ActionButton onClick={handlePrevClick} variant="stop">
              Stop
            </ActionButton>
          </ButtonGroup>
        </Wrapper>
      </Modal>
    </S.Container>
  );
};

export default StepOne;


const Wrapper = styled.div`
  padding: 1rem;
  background-color: ${theme.colors.white};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  height: 15rem;
  width: 24rem;
  overflow: hidden;
`;

const Message = styled.p`
  font-size: 1.3rem;
  margin-top:3rem;
  margin-bottom: 3rem;
  width: 100%;           
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;         
  gap: 0.5rem;
`;

const ActionButton = styled(Button)<{ variant: "cancel" | "stop" }>`
  flex: 1;
  height: 48px;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ variant, theme }) =>
    variant === "cancel" ? theme.colors.white_f1 : theme.colors.primary};
  color: ${({ variant, theme }) =>
    variant === "cancel" ? theme.colors.black : theme.colors.white};
`;