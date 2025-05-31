import * as S from "../common";
import styled from "@emotion/styled";
import SelectDestination from "../SelectDestination";
import { useFormContext } from "react-hook-form";
import { DestinationType, StepProps } from "../../diagnosis.type";
import Modal from "@/shared/components/modal/Modal";
import useToggle from "@/shared/lib/useToggle";
import { useNavigate } from "react-router-dom";
import theme from "@/shared/styles/theme";
import { useTranslation } from "react-i18next";

const StepOne = ({ onNext }: StepProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { watch } = useFormContext<{ visitType: DestinationType }>();
  const selectedDestination = watch("visitType") ?? undefined;
  const { isOpen, toggle } = useToggle();

  const handlePrevClick = () => {
    toggle();
    navigate("/");
  };

  return (
    <S.Container>
      <S.Question>{t("Where do you want to go?")}</S.Question>
      <SelectDestination selectedDestination={selectedDestination} />
      <S.ButtonContainer>
        <S.NavigateButton type="button" variant="prev" onClick={toggle}>
          <S.ButtonText variant="prev">{t("Prev")}</S.ButtonText>
        </S.NavigateButton>
        <S.NavigateButton
          type="button"
          disabled={!selectedDestination}
          onClick={onNext}
        >
          <S.ButtonText>{t("Next")}</S.ButtonText>
        </S.NavigateButton>
      </S.ButtonContainer>
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
    </S.Container>
  );
};

export default StepOne;

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
