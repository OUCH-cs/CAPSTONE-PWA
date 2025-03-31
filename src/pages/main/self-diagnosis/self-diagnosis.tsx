/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Collapsible from "react-collapsible";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import theme from "@/shared/styles/theme";
import { FAQ_DATA } from "@/shared/mock";
import { Button } from "@/shared/components/button/Button";

function SelfDiagnosisPage() {
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
            <p css={question}>{item.question}</p>
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
              <p css={answer}>{item.answer}</p>
            </AnswerContainer>
          </Collapsible>
        </Card>
      ))}

      <NextButton onClick={() => navigate("/diagnosis/funnel")}>
        <span css={nextButtonText}>Next</span>
      </NextButton>
    </Container>
  );
};

export {SelfDiagnosisPage}

const Container = styled.div`
  background-color: ${theme.colors.background};
  padding: 0 16px;
`;

const Title = styled.p`
  font-size: 20px;
  margin-bottom: 32px;
  padding: 14px;
  text-align: center;
`;

const Card = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 10px;
  border: 1px solid ${theme.colors.white_e5};
  padding: 13px 18px;
  margin-bottom: 12px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.04);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  cursor: pointer;
`;

const question = css`
  font-size: 16px;
`;

const AnswerContainer = styled.div`
  padding: 13px 18px 0;
`;

const answer = css`
  font-size: 14px;
  line-height: 20px;
  color: ${theme.colors.black};
`;

const FullWidthLine = styled.div`
  height: 1px;
  background-color: ${theme.colors.white_e5};
  margin: 12px -18px;
`;

const NextButton = styled(Button)`
  background-color: ${theme.colors.primary};
  padding: 12px 0;
  border-radius: 10px;
  width:100%;
  height: 48px;
  margin-top: 30px;
  text-align: center;
`;

const nextButtonText = css`
  color: ${theme.colors.white};
  font-size: 18px;
`;