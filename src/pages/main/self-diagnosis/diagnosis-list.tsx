import styled from "@emotion/styled";
import { Accordion } from "@/shared/components/accordion";
import ArrowIcon from "@/shared/assets/common/arrow.svg?react";
import theme from "@/shared/styles/theme";


function DiagnosisListPage() {
    const value = [{
        userId: 0,
        visitType: "HOSPITAL",
        symptoms: ["감기", "몸살"],
        duration: "LESS_THAN_1_DAY",
        painSeverity: 5,
        additionalNote: "ㅁㅁ",
        createdAt: "2024-11-20"
      },
      {
        userId: 1,
        visitType: "HOSPITAL",
        symptoms: ["감기", "몸살"],
        duration: "LESS_THAN_1_DAY",
        painSeverity: 5,
        additionalNote: "ㅁㅁ",
        createdAt: "2024-11-20"
      },
      {
        userId: 2,
        visitType: "HOSPITAL",
        symptoms: ["감기", "몸살"],
        duration: "LESS_THAN_1_DAY",
        painSeverity: 5,
        additionalNote: "ㅁㅁ",
        createdAt: "2024-11-20"
        
      },
      {
        userId: 0,
        visitType: "HOSPITAL",
        symptoms: ["감기", "몸살"],
        duration: "LESS_THAN_1_DAY",
        painSeverity: 5,
        additionalNote: "ㅁㅁ",
        createdAt: "2024-11-20"
      }     
    ]

    return (
        <Container>
          <Title>Self-diagnosis</Title>
          {/* 아코디언 루트 컨테이너 */}
          {value.map((item) => (
            <div key={item.userId} style={{ marginBottom: "30px" }}>
              <Text style={{ marginLeft: "6px" }}>{item.createdAt}</Text>
              <Accordion>
              {/* 아코디언 헤더 */}
              <Accordion.Header>
                <AccordionHeaderWrapper>
                  {item.visitType}
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
                        <Label>{"Symptoms"}</Label>
                        <Text>{item.symptoms}</Text>
                    </ItemWrapper>
                  </Accordion.Item>
                  <Accordion.Item>
                    <ItemWrapper>
                        <Label>{"Duration of symptoms"}</Label>
                        <Text>{item.duration}</Text>
                    </ItemWrapper>
                  </Accordion.Item>
                  <Accordion.Item>
                    <ItemWrapper>
                        <Label>{"Severity of symptoms"}</Label>
                        <Text>{item.painSeverity}</Text>
                    </ItemWrapper>
                  </Accordion.Item>
                  <Accordion.Item>
                    <ItemWrapper>
                        <Label>{"Symptoms in detail"}</Label>
                        <Text>{item.additionalNote}</Text>
                    </ItemWrapper>
                  </Accordion.Item>
                </BodyWrapper>
              </Accordion.Body>
            </Accordion>
          </div>
          ))}
        </Container>
      );
    }

export {DiagnosisListPage}


const Container = styled.div`
  background-color: ${theme.colors.background};
  padding: 0 1rem;
  overflow-y: auto;
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
  height: 63px;
  padding: 9px 15px;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  cursor: pointer;
`;

const BodyWrapper = styled.div`
  display: flex;
  background-color: ${theme.colors.white};
  flex-direction: column;
  border-radius: 10px;
`;

const ItemWrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: 18px;
  gap:10px;
  flex-direction: column;
  border-radius: 6px;
  border: none;
  text-align: left;
  cursor: pointer;
  color:${theme.colors.gray_7};
  white-space: pre-line;
`;
const Text = styled.p`
  font-size: 1.0rem;
  color: ${theme.colors.gray_7};
  margin-bottom:10px;

`;
const Label = styled.p`
  font-size: 1.2rem; 
  color: ${theme.colors.black};
`;