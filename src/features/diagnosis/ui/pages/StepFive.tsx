import * as S from "../style"
import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import { useFormContext, Controller } from "react-hook-form";
import SelectedSymptoms from "../SelectedSymptoms";
import { DiagnosisFormData } from "../../diagnosis.type";

const StepFive = () => {
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
      <S.NextButton>
        <S.NextButtonText>Save</S.NextButtonText>
      </S.NextButton>
    </S.Container>
  );
};

export default StepFive;

const TextArea = styled.textarea`
  width: 100%;
  height: 160px;
  border: 1px solid ${theme.colors.white};
  border-radius: 16px;
  padding: 14px;
  background-color: ${theme.colors.white};
  font-size: 16px;
  margin-bottom: 32px;
  resize: none;
`;

