/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import theme from "@/shared/styles/theme";
import { useFormContext, Controller } from "react-hook-form";
import SelectedSymptoms from "../SelectedSymptoms";
import { DiagnosisFormData } from "../../diagnosis.type";

const StepFive = () => {
  const navigate = useNavigate();
  const { control } = useFormContext<DiagnosisFormData>();

  return (
    <Container>
      <p css={question}>
        Please write down what you would like to tell the doctor additionally
      </p>

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

      <SaveButton >
        <p css={saveButtonText}>Save</p>
      </SaveButton>

      <BackButton onClick={() => navigate(-1)}>뒤로 가기</BackButton>
    </Container>
  );
};

export default StepFive;

const Container = styled.div`
  padding-top: 46px;
`;

const question = css`
  font-size: 21px;
  text-align: center;
  margin-bottom: 22px;
  padding: 0 16px;
`;

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

const SaveButton = styled.button`
  background-color: ${theme.colors.primary};
  padding: 12px 0;
  border-radius: 10px;
  height: 48px;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const saveButtonText = css`
  color: ${theme.colors.white};
  font-size: 18px;
`;

const BackButton = styled.button`
  margin-top: 16px;
  background: none;
  border: none;
  color: ${theme.colors.gray_7};
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
`;