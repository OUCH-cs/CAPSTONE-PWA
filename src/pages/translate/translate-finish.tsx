import styled from "@emotion/styled";
import finishImg from "@/shared/assets/translate/translate-finish.svg";
import theme from "@/shared/styles/theme";
import { Button } from "@/shared/components/button/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function TranslateFinishPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("Lion's Hall");

  return (
    <Container>
      <ImgWrapper>
        <img src={finishImg} alt="translation-finish-img" />
      </ImgWrapper>
      <Title>{t("Your consultation is complete!")}</Title>

      <FormWrapper style={{ marginBottom: "24px" }}>
        <Label>{t("Hospital")}</Label>
        <HospitalInput
          type="text"
          placeholder={t("Please write a hospital.")}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </FormWrapper>

      <FormWrapper style={{ marginBottom: "80px" }}>
        <Label>{t("Review")}</Label>
        <ReviewTextarea placeholder={t("Please leave a review.")} />
      </FormWrapper>

      <Button width={328} height={48} onClick={() => navigate("/translate")}>
        {t("Submit")}
      </Button>
    </Container>
  );
}

export { TranslateFinishPage };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 32px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 400;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

const HospitalInput = styled.input`
  width: 328px;
  height: 48px;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid ${theme.colors.white_e5};
  font-size: 13px;
  font-weight: 400;
  color: ${theme.colors.gray_7}
  background-color: ${theme.colors.white};
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.04);
`;

const ReviewTextarea = styled.textarea`
  width: 328px;
  height: 200px;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid ${theme.colors.white_e5};
  font-size: 13px;
  font-weight: 400;
  color: ${theme.colors.gray_7}
  background-color: ${theme.colors.white};
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.04);
`;
