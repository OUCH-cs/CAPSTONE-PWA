import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import { Button } from "@/shared/components/button/Button";

const Container = styled.div`
  padding-top: 3.29rem;
`;

const Question = styled.p`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 3.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap:20px;

`

const ButtonText = styled.p`
  color: ${theme.colors.white};
  font-size: 1.5rem;
`;

const NavigateButton = styled(Button)`
  height: 4rem;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 7rem;
`;

export {
  Container,
  Question,
  ButtonContainer ,
  ButtonText,
  NavigateButton
};