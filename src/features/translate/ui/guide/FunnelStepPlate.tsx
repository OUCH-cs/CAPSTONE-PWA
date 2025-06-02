import styled from "@emotion/styled";
import { Button } from "@/shared/components/button/Button";
import theme from "@/shared/styles/theme";
import { Guide, LocalizedText } from "../../translate.types";
import GuideAccordion from "./GuideAccordion";
import { useNavigate } from "react-router-dom";
import GuideProgressBar from "@/entities/translate/ui/GuideProgressBar";
import { useTranslation } from "react-i18next";

interface FunnelStepPlateProps {
  data: Guide;
  currentStep: string;
  setStep: React.Dispatch<React.SetStateAction<string>>;
  funnelModalToggle: () => void;
}

function FunnelStepPlate({
  data,
  currentStep,
  setStep,
  funnelModalToggle,
}: FunnelStepPlateProps) {
  const { t, i18n } = useTranslation();
  const languageCode = i18n.language as keyof LocalizedText;
  const navigate = useNavigate();

  const guideData = Object.entries(data)
    .filter(
      ([key, value]) =>
        [
          "whatToExpect",
          "keyPhrases",
          "actionGuide",
          "possibleQuestions",
          "tips",
        ].includes(key) &&
        value !== null &&
        value.length !== 0
    )
    .map(([title, text]) => ({ title, text }));

  const handleNextBtnClick = () => {
    if (currentStep === "5") {
      navigate("/translate");
      funnelModalToggle();
    } else {
      setStep((prev) => String(Number(prev) + 1));
    }
  };

  return (
    <Container>
      <GuideProgressBar currentStep={currentStep} title={data.title} />

      <TitleWrapper>
        <Title>{t("Purpose")}</Title>
        <Description>"{data.purpose[languageCode]}"</Description>
      </TitleWrapper>

      <GuideList>
        {guideData.map((guide, idx) => (
          <GuideAccordion data={guide} key={idx} />
        ))}
      </GuideList>

      <ButtonWrapper>
        {currentStep !== "1" && (
          <PrevButton
            onClick={() => setStep((prev) => String(Number(prev) - 1))}
          >
            {t("Prev")}
          </PrevButton>
        )}
        <Button width={154} height={52} onClick={handleNextBtnClick}>
          {currentStep === "5" ? t("Finish") : t("Next")}
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

export { FunnelStepPlate };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 298px;
  margin-bottom: 32px;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 500;
  color: #000000;
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: #000;
`;

const GuideList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 328px;
  margin-bottom: 32px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 50px;
`;

const PrevButton = styled.button`
  width: 154px;
  height: 52px;
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.white_e5};
  border-radius: 10px;
`;
