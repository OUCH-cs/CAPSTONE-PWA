import styled from "@emotion/styled";
import { IInputFieldProps } from "../auth.types";

function InputField({ errorMessage, ...props }: IInputFieldProps) {
  return (
    <Container>
      <Input {...props} />
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </Container>
  );
}

export { InputField };

const Container = styled.div``;

const Input = styled.input`
  width: 328px;
  height: 56px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.white_e5};
  padding: 0 0 0 18px;
`;

const ErrorMessage = styled.p``;
