import theme from "@/shared/styles/theme";
import styled from "@emotion/styled";
import RoutingIcon from "@/shared/assets/translate/guide-routing.svg?react";
import Arrow from "@/shared/assets/common/arrow.svg?react";
import { useTranslation } from "react-i18next";

export default function GuideRoutingButton({ toggle }: { toggle: () => void }) {
  const { t } = useTranslation();

  return (
    <Container onClick={toggle}>
      <TextWrapper>
        <RoutingIcon />
        {t("Guide")}
      </TextWrapper>

      <ArrowIconWrapper>
        <Arrow width="16" height="16" stroke="#000" strokeWidth="2" />
      </ArrowIconWrapper>
    </Container>
  );
}

const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  width: fit-content;
  height: 51px;
  padding: 0 18px;
  border-radius: 12px;
  background-color: ${theme.colors.white};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 400;
  color: ${theme.colors.black};
`;

const ArrowIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-90deg);
`;
