import * as S from '../common'
import SelectDestination from "../SelectDestination";
import { useFormContext } from "react-hook-form";
import { DestinationType, StepProps } from "../../diagnosis.type";

const StepOne = ({ onNext, onPrev }: StepProps) => {
  const { watch } = useFormContext<{ visitType: DestinationType }>();
  const selectedDestination = watch("visitType") ?? undefined;

  return (
    <S.Container>
      <S.Question>Where do you want to go?</S.Question>
      <SelectDestination selectedDestination={selectedDestination} />
      <S.ButtonContainer>
        <S.NavigateButton
          onClick={onPrev}
        >
          <S.ButtonText>Prev</S.ButtonText>
        </S.NavigateButton>
        <S.NavigateButton
          disabled={!selectedDestination}
          onClick={onNext}
        >
          <S.ButtonText>Next</S.ButtonText>
        </S.NavigateButton>
      </S.ButtonContainer>
    </S.Container>

  );
};

export default StepOne;
