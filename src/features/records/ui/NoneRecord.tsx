// 의료기록 데이터 없을때
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export default function NoneRecord() {
    const navigate = useNavigate();
  return (
    <>
    <Container>
      <Message>"Would you like to start<br />Medical Record?"</Message>
    </Container>
    <StartButton onClick={() => navigate("/records/medicalrecord-add")}>Start</StartButton>
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
    width: 112px;
    height: 52px;
    background-color: #0097A7;
    color: #FFF;
    padding: 15px 34px;
    border-radius: 20px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-seight: 500;
    font-family: Pretendard;
    margin: 32px auto 0 auto;

`;