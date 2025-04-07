import { Accordion } from "@/shared/components/accordion";
import { useNavigate } from "react-router-dom";
import * as S from "../../../features/diagnosis/ui/common"
import styled from "@emotion/styled";
import ArrowIcon from "@/shared/assets/common/arrow.svg?react";
import theme from "@/shared/styles/theme";
import { FAQ_DATA } from "@/shared/mock";


function DiagnosisFaqPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Self-diagnosis</Title>
      {/* 아코디언 루트 컨테이너 */}
      {FAQ_DATA.map((item) => (
        <div key={item.id} style={{ marginBottom: "12px" }}>
          <Accordion>
          {/* 아코디언 헤더 */}
          <Accordion.Header>
            <AccordionHeaderWrapper>
              {item.question}
              {/* 아코디언 아이콘 컨테이너 */}
              <Accordion.Trigger>
                <ArrowIcon />
              </Accordion.Trigger>
            </AccordionHeaderWrapper>
          </Accordion.Header>
          {/* 아코디언 콘텐츠 */}
          <Accordion.Body>
            {/* 아코디언 콘텐츠 */}
            <BodyWrapper>
              <Accordion.Item>
                <ItemWrapper>
                {item.answer}
                </ItemWrapper>
              </Accordion.Item>
            </BodyWrapper>
          </Accordion.Body>
        </Accordion>
      </div>
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

const AccordionHeaderWrapper = styled.div`
  display: flex;
  background-color: ${theme.colors.white};
  font-size: 16px;
  justify-content: space-between;
  align-items: center;
  width: inherit;
  height: 56px;
  padding: 9px 15px;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  cursor: pointer;
`;

const BodyWrapper = styled.div`
  display: flex;
  background-color: ${theme.colors.white};
  flex-direction: column;
  gap: 10px;
`;

const ItemWrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: 18px;
  align-items: center; 
  border-radius: 6px;
  border: none;
  text-align: left;
  cursor: pointer;
  white-space: pre-line;
`;
