import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import CloseIcon from "@/shared/assets/common/closed.svg?react";
import { useNavigate } from "react-router-dom";
import Modal from "@/shared/components/modal/Modal";
import useToggle from "@/shared/lib/useToggle";
import { useTranslation } from "react-i18next";
import { useSetAtom } from "jotai";
import { selectedSystemAtom } from "../service/selfDiagnosisAtoms";

function Header() {
  const { t } = useTranslation();
  const setSelectedSystem = useSetAtom(selectedSystemAtom);
  const navigate = useNavigate();
  const { isOpen, toggle } = useToggle();

  const handlePrevClick = () => {
    toggle();
    setSelectedSystem("");
    navigate(-1);
  };

  return (
    <Container>
      <HeaderWrapper>
        <BackwardIconWrapper onClick={toggle}>
          <CloseIcon width={28} height={28} />
        </BackwardIconWrapper>
        <Title>{t("Self-diagnosis")}</Title>
      </HeaderWrapper>
      <Modal isOpen={isOpen} toggle={toggle}>
        <Wrapper>
          <Message>{t("Do you want to stop\nthe self-diagnosis?")}</Message>
          <ButtonGroup>
            <ActionButton onClick={toggle} variant="cancel">
              {t("Cancel")}
            </ActionButton>
            <ActionButton onClick={handlePrevClick} variant="stop">
              {t("Stop")}
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
  margin-bottom: 1rem;
`;

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
  background-color: #ffffff;
  border-radius: 10px;
  text-align: center;
  width: 316px;
  font-family: Pretendard;
  box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.1);
  padding: 66px 0 0 0;
`;

const Message = styled.p`
  font-size: 18px;
  color: #000;
  font-weight: 400;
  text-align: center;
  line-height: normal;
  margin-bottom: 46px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
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
  color: ${({ variant }) =>
    variant === "cancel" ? theme.colors.black : theme.colors.white};
  border-radius: ${(props) =>
    props.variant === "cancel" ? "0 0 0 10px" : "0 0 10px 0"};
`;
