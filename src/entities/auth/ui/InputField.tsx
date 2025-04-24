import styled from "@emotion/styled";
import { IInputFieldProps } from "../auth.types";

function InputField({ error, ...props }: IInputFieldProps) {
  return (
    <Container>
      <Input isError={!!error} {...props} />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </Container>
  );
}

export { InputField };

const Container = styled.div`
  position: relative;
`;

const Input = styled.input<{ isError: boolean }>`
  width: 328px;
  height: 56px;
  border-radius: 10px;
  border: 1px solid
    ${({ isError, theme }) =>
      isError ? theme.colors.red : theme.colors.white_e5};
  padding-left: 18px;
`;

const ErrorMessage = styled.p`
  position: absolute;
  top: 55px;
  margin-top: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.red};
  white-space: pre-line;
`;
