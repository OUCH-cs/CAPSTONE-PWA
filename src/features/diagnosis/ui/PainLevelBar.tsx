import styled from "@emotion/styled";
import { css } from "@emotion/react";
import theme from "@/shared/styles/theme";
import { Controller, useFormContext } from "react-hook-form";

const PainLevelBar = () => {
  const { control } = useFormContext<{ painSeverity: number }>();

  return (
    <ScaleContainer>
      <ScaleLabelContainer>
        <p css={scaleText}>0</p>
        <p css={scaleText}>10</p>
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
        <p css={scaleText}>mild</p>
        <p css={scaleText}>severe</p>
      </ScaleLabelContainer>
    </ScaleContainer>
  );
};

export default PainLevelBar;

const ScaleContainer = styled.div`
  margin-bottom: 38px;
`;

const ScaleLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 16px;
`;

const scaleText = css`
  font-size: 14px;
  color: ${theme.colors.gray_4};
`;

const SliderWrapper = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 100px;
  padding: 0 16px;
  margin: 6px 16px;
  height: 36px;
  display: flex;
  align-items: center;
`;

const SliderInput = styled.input<{ value: number }>`
  width: 100%;
  appearance: none;
  height: 4px;
  border-radius: 5px;
  background: ${({ value }) =>
    `linear-gradient(to right,${theme.colors.primary} 0%,${theme.colors.primary} ${value * 10}%, ${theme.colors.white_e5} ${value * 10}%, ${theme.colors.white_e5} 100%)`};
  outline: none;
  transition: background 0.3s;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: ${theme.colors.primary};
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: ${theme.colors.primary};
    border-radius: 50%;
    cursor: pointer;
  }

  &::-ms-thumb {
    width: 20px;
    height: 20px;
    background: ${theme.colors.primary};
    border-radius: 50%;
    cursor: pointer;
  }
`;