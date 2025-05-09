import { Controller, FormProvider } from "react-hook-form";
import { FunnelStepPlate } from "@/features/sign-up/ui/funnel/FunnelStepPlate";
import { InputField } from "@/entities/auth/ui";
import GenderSelection from "./GenderSelection";
import CountryAccordion from "./CountryAccordion";
import { SignupFunnelProps } from "../../sign-up.types";
import { useSignupForm } from "../../lib/useSignupForm";

function SignupFunnel({ steps, setStep, Funnel, Step }: SignupFunnelProps) {
  const { methods, register, control, errors, watch, handleSubmit, onSubmit } =
    useSignupForm();

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
            label="nationCode"
            onNext={() => setStep(steps[3])}
            value={watch("nationCode")}
          >
            <Controller
              name="nationCode"
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
              type="tel"
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
