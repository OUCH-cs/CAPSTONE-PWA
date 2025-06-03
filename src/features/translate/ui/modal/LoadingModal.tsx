import styled from "@emotion/styled";
import Modal from "@/shared/components/modal/Modal";
import theme from "@/shared/styles/theme";
import { useTranslation } from "react-i18next";
import BouncingLoadingDots from "@/shared/components/loading/BouncingLoadingDots";

interface LoadingModalProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function LoadingModal({ isOpen, toggle }: LoadingModalProps) {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalWrapper>
        <Title>{t("Loading...")}</Title>

        <BouncingLoadingDots />
      </ModalWrapper>
    </Modal>
  );
}

const ModalWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 220px;
  height: 150px;
  background-color: ${theme.colors.white};
`;

const Title = styled.p`
  width: 204px;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  color: ${theme.colors.gray_4};
`;
