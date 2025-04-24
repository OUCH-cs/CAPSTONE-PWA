import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { FunnelStepPlate } from "@/features/sign-up/ui/funnel/FunnelStepPlate";
import { InputField } from "@/entities/auth/ui";
import GenderSelection from "./GenderSelection";
import CountryAccordion from "./CountryAccordion";
import { useNavigate } from "react-router-dom";
import { FormFields, SignupFunnelProps } from "../../sign-up.types";
import { defaultSignupValues, schema } from "../../lib/form.schema";
import apiRequest from "@/shared/api/apiRequest";

function SignupFunnel({ steps, setStep, Funnel, Step }: SignupFunnelProps) {
  const navigate = useNavigate();

  const methods = useForm<FormFields>({
    defaultValues: defaultSignupValues,
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    // navigate("/sign-up/success");
    const res = await apiRequest({
      url: "/users/signup",
      method: "POST",
      data,
    });
    console.log(res);
  };

  return (
    <FormProvider {...methods}>
      <Funnel>
        {/* 이름 */}
        <Step name={steps[0]}>
          <FunnelStepPlate
            label="name"
            onNext={() => setStep(steps[1])}
            value={watch("name")}
          >
            <InputField
              {...register("name")}
              placeholder="YUJIN"
              error={errors.name}
            />
          </FunnelStepPlate>
        </Step>

        {/* 성별 */}
        <Step name={steps[1]}>
          <FunnelStepPlate
            label="gender"
            onNext={() => setStep(steps[2])}
            value={watch("gender")}
          >
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <GenderSelection
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </FunnelStepPlate>
        </Step>

        {/* 국적 */}
        <Step name={steps[2]}>
          <FunnelStepPlate
            label="nationId"
            onNext={() => setStep(steps[3])}
            value={watch("nationId")}
          >
            <Controller
              name="nationId"
              control={control}
              render={({ field }) => (
                <CountryAccordion
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </FunnelStepPlate>
        </Step>

        {/* 전화번호 */}
        <Step name={steps[3]}>
          <FunnelStepPlate
            label="phoneNumber"
            onNext={() => setStep(steps[4])}
            value={watch("phoneNumber")}
          >
            <InputField
              {...register("phoneNumber")}
              placeholder="010-0000-0000"
              type="string"
              error={errors.phoneNumber}
            />
          </FunnelStepPlate>
        </Step>

        {/* 이메일 */}
        <Step name={steps[4]}>
          <FunnelStepPlate
            label="email"
            onNext={() => setStep(steps[5])}
            value={watch("email")}
          >
            <InputField
              {...register("email")}
              placeholder="abcde@gmail.com"
              error={errors.email}
            />
          </FunnelStepPlate>
        </Step>

        {/* 아이디 */}
        <Step name={steps[5]}>
          <FunnelStepPlate
            label="loginId"
            onNext={() => setStep(steps[6])}
            value={watch("loginId")}
          >
            <InputField
              {...register("loginId")}
              placeholder="ID"
              error={errors.loginId}
            />
          </FunnelStepPlate>
        </Step>

        {/* 비밀번호 */}
        <Step name={steps[6]}>
          <FunnelStepPlate
            label="password"
            onNext={() => setStep(steps[7])}
            value={watch("password")}
          >
            <InputField
              {...register("password")}
              placeholder="PW"
              type="password"
              error={errors.password}
            />
          </FunnelStepPlate>
        </Step>

        {/* 닉네임 */}
        <Step name={steps[7]}>
          <FunnelStepPlate
            label="nickname"
            onNext={handleSubmit(onSubmit)}
            value={watch("nickname")}
          >
            <InputField
              {...register("nickname")}
              placeholder="Jenny"
              error={errors.nickname}
            />
          </FunnelStepPlate>
        </Step>
      </Funnel>
    </FormProvider>
  );
}

export { SignupFunnel };
