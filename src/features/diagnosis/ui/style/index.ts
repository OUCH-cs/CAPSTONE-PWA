import styled from "@emotion/styled";
import { Button } from "@/shared/components/button/Button";

const Container = styled.div`
  padding-top: 46px;
`;

const Question = styled.p`
  font-size: 21px;
  text-align: center;
  margin-bottom: 49px;
`

const NextButtonText = styled.p`
  color: theme.colors.white,
  fontSize: 18,
`

const NextButton = styled(Button)`
  height: 48px;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`

export {
    Container,
    Question,
    NextButton,
    NextButtonText,
  };