import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const PainLevelBar = () => {
  const {t} =  useTranslation()
  const { control } = useFormContext<{ painSeverity: number }>();

  return (
    <ScaleContainer>
      <ScaleLabelContainer>
        <ScaleText>0</ScaleText>
        <ScaleText>10</ScaleText>
      </ScaleLabelContainer>

      <SliderWrapper>
        <Controller
          name="painSeverity"
          control={control}
          render={({ field: { value, onChange } }) => (
            <SliderInput
              type="range"
              min={0}
              max={10}
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
            />
          )}
        />
      </SliderWrapper>
      <ScaleLabelContainer>
        <ScaleText>{t("mild")}</ScaleText>
        <ScaleText>{t("severe")}</ScaleText>
      </ScaleLabelContainer>
    </ScaleContainer>
  );
};

export default PainLevelBar;

// Styled components

const ScaleContainer = styled.div`
  margin-bottom: 2.38rem; /* 38px */
`;

const ScaleLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 1rem;
`;

const ScaleText = styled.p`
  font-size: 1rem;
  color: ${theme.colors.gray_4};
`;

const SliderWrapper = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 100px;
  padding: 0 1rem; 
  margin: 0.38rem 1rem; 
  height: 2.8rem; 
  display: flex;
  align-items: center;
`;

const SliderInput = styled.input<{ value: number }>`
  width: 100%;
  appearance: none;
  height: 0.38rem; 
  border-radius: 0.31rem; 
  background: ${({ value }) =>
    `linear-gradient(to right,${theme.colors.primary} 0%,${theme.colors.primary} ${value * 10}%, ${theme.colors.white_ec} ${value * 10}%, ${theme.colors.white_ec} 100%)`};
  outline: none;
  transition: background 0.3s;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 1.8rem; 
    height: 1.8rem;
    background: ${theme.colors.primary};
    border-radius: 50%;
  }

  &::-moz-range-thumb {
    width: 1.8rem;
    height: 1.8rem;
    background: ${theme.colors.primary};
    border-radius: 50%;
  }

  &::-ms-thumb {
    width: 1.8rem;
    height: 1.8rem;
    background: ${theme.colors.primary};
    border-radius: 50%;

  }
`;