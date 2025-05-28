import styled from "@emotion/styled";
import { InputField } from "@/entities/auth/ui";
import { Button } from "@/shared/components/button/Button";
import { useSigninForm } from "../lib/useSigninForm";

export default function LoginForm() {
  const { register, handleSubmit, onSubmit, errors } = useSigninForm();

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <InputField
          placeholder="ID"
          type="text"
          {...register("loginId")}
          error={errors.loginId}
        />
        <InputField
          placeholder="PW"
          type="password"
          {...register("password")}
          error={errors.password}
        />
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
  gap: 25px;
`;
