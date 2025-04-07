import styled from "@emotion/styled";
import { useAtom } from "jotai";
import InputField from "@/entities/auth/ui/InputField";
import { Button } from "@/shared/components/button/Button";
import { isAuthAtom } from "@/features/sign-in/services/atoms";

export default function LoginForm() {
  const [isAuth, setIsAuth] = useAtom(isAuthAtom);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAuth(!isAuth);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputWrapper>
        <InputField placeholder="ID" type="text" />
        <InputField placeholder="PW" type="password" />
      </InputWrapper>

      <Button type="submit">Log In</Button>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 52px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
