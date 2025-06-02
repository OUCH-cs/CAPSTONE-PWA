import { GuideFunnelProps } from "../../translate.types";
import { FunnelStepPlate } from "./FunnelStepPlate";
import useSWR from "swr";
import { fetchGudieText } from "../../services/api/fetchGuideText";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GuideFunnel({
  currentStep,
  steps,
  setStep,
  Funnel,
  Step,
  funnelModalToggle,
}: GuideFunnelProps) {
  const navigate = useNavigate();

  const { data, error } = useSWR(`/guide/visit`, fetchGudieText, {
    dedupingInterval: 1000 * 60 * 60, // 1시간
  });

  // 에러 예외 처리
  useEffect(() => {
    if (error) {
      alert("An error occurred while fetching the data.");
      navigate("/translate");
    }
  }, [error]);

  return (
    <Funnel>
      {steps.map((step, index) => (
        <Step key={index} name={step}>
          {data && (
            <FunnelStepPlate
              data={data[parseInt(currentStep) - 1]}
              currentStep={currentStep}
              setStep={setStep}
              funnelModalToggle={funnelModalToggle}
            />
          )}
        </Step>
      ))}
    </Funnel>
  );
}
