import styled from "@emotion/styled";
import Modal from "@/shared/components/modal/Modal";
import theme from "@/shared/styles/theme";
import { useTranslation } from "react-i18next";

interface LocationConfirmModalProps {
  isOpen: boolean;
  toggle: () => void;
  onConfirm: () => void;
}

export default function LocationConfirmModal({
  isOpen,
  toggle,
  onConfirm,
}: LocationConfirmModalProps) {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalWrapper>
        <ContentWrapper>
          <Location>{t("Current Location")}: (37.30, 126.84)</Location>
          <Estimate>{t("(estimated)medical institution")}</Estimate>
          <LionsHall>Lion's Hall</LionsHall>
        </ContentWrapper>

        <ConfirmText>
          {t("Is this the correct\ninstitution you want to use?")}
        </ConfirmText>

        <ButtonWrapper>
          <CancelButton onClick={toggle}>{t("Cancel")}</CancelButton>
          <FinishButton onClick={onConfirm}>{t("Yes")}</FinishButton>
        </ButtonWrapper>
      </ModalWrapper>
    </Modal>
  );
}

const ModalWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;

  width: 296px;
  height: 202px;
  background-color: ${theme.colors.white};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  margin-bottom: 15px;
`;

const Location = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: ${theme.colors.gray_4};
  text-align: center;
`;
const Estimate = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${theme.colors.black};
  text-align: center;
`;
const LionsHall = styled.strong`
  font-size: 18px;
  font-weight: 700;
  color: ${theme.colors.black};
  text-align: center;
`;
const ConfirmText = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: ${theme.colors.black};
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
