import * as S from "../common"
import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import { useFormContext, Controller } from "react-hook-form";
import { DiagnosisFormData } from "../../diagnosis.type";
import { StepSixProps} from "../../diagnosis.type";
import { useNavigate } from "react-router-dom";


const StepSix = ({ onPrev }: StepSixProps) => {
  const navigate = useNavigate()
  const { control} = useFormContext<DiagnosisFormData>();


  return (
    <S.Container>
      <S.Question>
        Please write down what you would like to tell the doctor additionally
      </S.Question>
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
              type='button'
              variant = "prev"
              onClick={onPrev}
            >
              <S.ButtonText variant = "prev">Prev</S.ButtonText>
            </S.NavigateButton>
            <S.NavigateButton
              type='submit'
              onClick={() => {navigate("/recommend")}}
            >
              <S.ButtonText>Save</S.ButtonText>
            </S.NavigateButton>
          </S.ButtonContainer>
    </S.Container>
  );
};

export default StepSix;

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
