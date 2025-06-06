import { Button } from "@/shared/components/button/Button";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

export default function TranslateStarter({ onStart }: { onStart: () => void }) {
  const { t } = useTranslation();
  return (
    <Container>
      <Title>{t("Would you like to start interpretation?")}</Title>
      <Button width={112} height={52} onClick={onStart}>
        {t("Start")}
      </Button>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const Title = styled.h1`
  width: 252px;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;
