// 자가진단 데이터 없을때
import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NoneDiagnosis() {
  const {t} = useTranslation();
    const navigate = useNavigate();
  return (
    <>
    <Container>
      <Message>
        {t("Would you like to start Self-Diagnosis?").split('\n').map((line, i, arr) => (
                      <React.Fragment key={i}>
                      {line}
                      {i !== arr.length - 1 && <br />}
                      </React.Fragment>
                ))}
      </Message>
    </Container>
    <StartButton onClick={() => navigate("/self-diagnosis")}>{t("Start")}</StartButton>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f9fc;
  border-radius: 10px;
  margin-top: 250px;
`;

const Message = styled.p`
  font-size: 24px;
  color: #00000;
  font-weight: 500;
  text-align: center;
  font-family: Pretendard;
`;

const StartButton = styled.button`
    display:flex;
    width: 125px;
    height: 52px;
    background-color: #0097A7;
    color: #FFF;
    padding: 15px 30px;
    border-radius: 20px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-seight: 500;
    font-family: Pretendard;
    margin: 32px auto 0 auto;

`;