/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import theme from "@/shared/styles/theme";
import { useFormContext } from "react-hook-form";
import { useSymptomsStore } from "../service/useDiagnosisStore";
import { SYMPTOMS } from "@/shared/mock";

const ITEMS_PER_ROW = 5;

const SymptomsList = () => {
  const { setValue, watch } = useFormContext<{ symptoms: string[] }>();
  const selectedSymptoms = watch("symptoms") || [];
  const { customSymptoms } = useSymptomsStore();
  const allSymptoms = [...SYMPTOMS, ...customSymptoms];

  const toggleSymptom = (symptom: string) => {
    const updatedSymptoms = selectedSymptoms.includes(symptom)
      ? selectedSymptoms.filter((s) => s !== symptom)
      : [...selectedSymptoms, symptom];

    setValue("symptoms", updatedSymptoms);
  };

  const chunkArray = (arr: string[], size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const groupedSymptoms = chunkArray(allSymptoms, ITEMS_PER_ROW);

  return (
    <>
      {groupedSymptoms.map((group, index) => (
        <SymptomsRow key={`group-${index}`}>
          {group.map((item) => (
            <SymptomButton
              key={item}
              selected={selectedSymptoms.includes(item)}
              onClick={() => toggleSymptom(item)}
            >
              <p
                css={[
                  symptomText,
                  selectedSymptoms.includes(item) && selectedText,
                ]}
              >
                {item}
              </p>
            </SymptomButton>
          ))}
        </SymptomsRow>
      ))}
    </>
  );
};

export default SymptomsList;

const SymptomsRow = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  margin-top: 16px;
`;

const SymptomButton = styled.button<{ selected: boolean }>`
  padding: 10px 16px;
  border-radius: 400px;
  border: 1px solid
    ${(props) =>
      props.selected ? theme.colors.primary : theme.colors.white_e5};
  background-color: ${(props) =>
    props.selected ? theme.colors.tertiary : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const symptomText = css`
  font-size: 16px;
  color: ${theme.colors.gray_7};
`;

const selectedText = css`
  color: ${theme.colors.primary};
`;