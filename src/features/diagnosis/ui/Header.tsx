
import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import BackArrowIcon from "@/shared/assets/common/arrow.svg?react";
import { useNavigate } from "react-router-dom";
import Modal from '@/shared/components/modal/Modal';
import useToggle from '@/shared/lib/useToggle';

function Header() {
  const navigate = useNavigate();
  const { isOpen, toggle } = useToggle();

  const handlePrevClick = () => {
    toggle();
    navigate("/")
  };

  return (
    <Container>
      <HeaderWrapper>
        <BackwardIconWrapper onClick={toggle}>
          <BackArrowIcon width={28} height={28} />
        </BackwardIconWrapper>
        <Title>Self-diagnosis</Title>
      </HeaderWrapper>
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
    </Container>
    
  );
}

export { Header };

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 360px;
  max-width: 450px;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  margin-bottom: 2.3rem;

`

const Title = styled.p`
  font-size: 1.7rem;
  font-weight: 500;
  text-align: center;
`;


const BackwardIconWrapper = styled.div`
  position: absolute;
  //   top: 50%;
  left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(90deg);
`;


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

const ActionButton = styled.button<{ variant: "cancel" | "stop" }>`
  flex: 1;               
  height: 48px;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ variant, theme }) =>
    variant === "cancel" ? theme.colors.white_f1 : theme.colors.primary};
  color: ${({ variant }) => (variant === "cancel" ? theme.colors.black : theme.colors.white)};
`;