import styled from "@emotion/styled";
import { Button } from "@/shared/components/button/Button";
import theme from "@/shared/styles/theme";
import { Guide } from "../../translate.types";
import GuideAccordion from "./GuideAccordion";
import { useNavigate } from "react-router-dom";
import GuideProgressBar from "@/entities/translate/ui/GuideProgressBar";

interface FunnelStepPlateProps {
  data: Guide;
  currentStep: string;
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

function FunnelStepPlate({ data, currentStep, setStep }: FunnelStepPlateProps) {
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
    } else {
      setStep((prev) => String(Number(prev) + 1));
    }
  };

  return (
    <Container>
      <GuideProgressBar currentStep={currentStep} title={data.title} />

      <TitleWrapper>
        <Title>Purpose</Title>
        <Description>"{data.purpose.en}"</Description>
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
            Prev
          </PrevButton>
        )}
        <Button width={154} height={52} onClick={handleNextBtnClick}>
          {currentStep === "5" ? "Finish" : "Next"}
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
`;

const PrevButton = styled.button`
  width: 154px;
  height: 52px;
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  background-color: transparent;
  border: 1px solid ${theme.colors.white_e5};
  border-radius: 10px;
`;
