import * as S from "../common"
import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import { useFormContext, Controller } from "react-hook-form";
import SelectedSymptoms from "../SelectedSymptoms";
import { DiagnosisFormData } from "../../diagnosis.type";
import { StepProps } from "../../diagnosis.type";


const StepFive = ({ onPrev }: StepProps) => {
  const { control } = useFormContext<DiagnosisFormData>();

  return (
    <S.Container>
      <S.Question>
        Please write down what you would like to tell the doctor additionally
      </S.Question>
      <SelectedSymptoms />
      <Controller
        name="additionalNote"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextArea
            placeholder="Please write down the relevant symptoms in detail"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
          />
        )}
      />
          <S.ButtonContainer>
            <S.NavigateButton
              onClick={onPrev}
            >
              <S.ButtonText>Prev</S.ButtonText>
            </S.NavigateButton>
            <S.NavigateButton
            >
              <S.ButtonText>Save</S.ButtonText>
            </S.NavigateButton>
          </S.ButtonContainer>
    </S.Container>
  );
};

export default StepFive;

const TextArea = styled.textarea`
  width: 100%;
  height: 13rem;
  border: 0.06rem solid ${theme.colors.white}; 
  border-radius: 1rem; 
  padding: 1rem; 
  background-color: ${theme.colors.white};
  font-size: 1.3rem; 
  margin-bottom: 2rem; 
  resize: none;
`;

