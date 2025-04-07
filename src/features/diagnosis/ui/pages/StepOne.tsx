import * as S from '../common'
import SelectDestination from "../SelectDestination";
import { useFormContext } from "react-hook-form";
import { DestinationType, StepProps } from "../../diagnosis.type";

const StepOne = ({ onNext }: StepProps) => {
  const { watch } = useFormContext<{ visitType: DestinationType }>();
  const selectedDestination = watch("visitType") ?? undefined;

  return (
    <S.Container>
      <S.Question>Where do you want to go?</S.Question>
      <SelectDestination selectedDestination={selectedDestination} />
      <S.NextButton
        disabled={!selectedDestination}
        onClick={onNext}
      >
        <S.NextButtonText>Next</S.NextButtonText>
      </S.NextButton>
    </S.Container>
  );
};

export default StepOne;
