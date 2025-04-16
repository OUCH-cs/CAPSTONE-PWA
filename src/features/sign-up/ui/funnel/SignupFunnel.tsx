import { ClassPostProps } from "@/features/diagnosis/ui/Funnel";
import { FunnelStepPlate } from "@/shared/components/funnel/FunnelStepPlate";
import { InputField } from "@/entities/auth/ui";
import GenderSelection from "./GenderSelection";
import CountryAccordion from "./CountryAccordion";
import { useNavigate } from "react-router-dom";

interface SignupFunnelProps extends Omit<ClassPostProps, "nextClickHandler"> {
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

function SignupFunnel({ steps, setStep, Funnel, Step }: SignupFunnelProps) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/sign-up/success");
  };

  return (
    <Funnel>
      {/* 이름 */}
      <Step name={steps[0]}>
        <FunnelStepPlate label="name" onNext={() => setStep(steps[1])}>
          <InputField placeholder="YUJIN" />
        </FunnelStepPlate>
      </Step>

      {/* 성별 */}
      <Step name={steps[1]}>
        <FunnelStepPlate label="name" onNext={() => setStep(steps[2])}>
          <GenderSelection />
        </FunnelStepPlate>
      </Step>

      {/* 국적 */}
      <Step name={steps[2]}>
        <FunnelStepPlate label="country" onNext={() => setStep(steps[3])}>
          <CountryAccordion />
        </FunnelStepPlate>
      </Step>

      {/* 전화번호 */}
      <Step name={steps[3]}>
        <FunnelStepPlate label="phone" onNext={() => setStep(steps[4])}>
          <InputField placeholder="010-0000-0000" type="number" />
        </FunnelStepPlate>
      </Step>

      {/* 전화번호 */}
      <Step name={steps[4]}>
        <FunnelStepPlate label="email" onNext={() => setStep(steps[5])}>
          <InputField placeholder="abcde@gmail.com" />
        </FunnelStepPlate>
      </Step>

      {/* 아이디 */}
      <Step name={steps[5]}>
        <FunnelStepPlate label="id" onNext={() => setStep(steps[6])}>
          <InputField placeholder="ID" />
        </FunnelStepPlate>
      </Step>

      {/* 비밀번호 */}
      <Step name={steps[6]}>
        <FunnelStepPlate label="pw" onNext={() => setStep(steps[7])}>
          <InputField placeholder="PW" type="password" />
        </FunnelStepPlate>
      </Step>

      {/* 닉네임 */}
      <Step name={steps[7]}>
        <FunnelStepPlate label="nickname" onNext={handleSubmit}>
          <InputField placeholder="Jenny" />
        </FunnelStepPlate>
      </Step>
    </Funnel>
  );
}

export { SignupFunnel };
