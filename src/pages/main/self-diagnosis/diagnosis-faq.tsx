import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../../../features/diagnosis/ui/style"
import Collapsible from "react-collapsible";
import styled from "@emotion/styled";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import theme from "@/shared/styles/theme";
import { FAQ_DATA } from "@/shared/mock";

function DiagnosisFaqPage() {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string | null) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <Container>
      <Title>Self-diagnosis</Title>
      {FAQ_DATA.map((item) => (
        <Card key={item.id}>
          <CardHeader onClick={() => toggleAccordion(item.id)}>
            <QuestionText>{item.question}</QuestionText>
            {openId === item.id ? (
              <IoChevronUp size={20} />
            ) : (
              <IoChevronDown size={20} />
            )}
          </CardHeader>
          {openId === item.id && <FullWidthLine />}
          <Collapsible
            open={openId === item.id}
            trigger=""
            transitionTime={200}
          >
            <AnswerContainer>
              <AnswerText>{item.answer}</AnswerText>
            </AnswerContainer>
          </Collapsible>
        </Card>
      ))}
      <S.NextButton onClick={() => navigate("/self-diagnosis")}>
        <S.NextButtonText>Next</S.NextButtonText>
      </S.NextButton>
    </Container>
  );
}

export { DiagnosisFaqPage }

const Container = styled.div`
  background-color: ${theme.colors.background};
  padding: 0 1rem;
`;

const Title = styled.p`
  font-size: 1.7rem;
  font-weight: 500;
  text-align: center;
  padding: 1.5rem;
  margin-bottom: 2.3rem;
`;

const Card = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 0.625rem;
  border: 0.06rem solid ${theme.colors.white_e5};
  padding: 0.81rem 1.13rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 0.125rem 0.188rem rgba(0, 0, 0, 0.04);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  cursor: pointer;
`;

const QuestionText = styled.p`
  font-size: 1rem;
`;

const AnswerContainer = styled.div`
  padding: 0.81rem 1.13rem 0;
`;

const AnswerText = styled.p`
  font-size: 0.88rem;
  line-height: 1.25rem;
  color: ${theme.colors.black};
`;

const FullWidthLine = styled.div`
  height: 0.06rem;
  background-color: ${theme.colors.white_e5};
  margin: 0.75rem -1.13rem;
`;
