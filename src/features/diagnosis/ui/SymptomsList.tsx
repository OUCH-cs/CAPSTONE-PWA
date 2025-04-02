import styled from "@emotion/styled";
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
              <SymptomText selected={selectedSymptoms.includes(item)}>
                {item}
              </SymptomText>
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
  overflow-x: auto;
  margin-top: 16px;
  width:100%;
  justify-content: flex-start;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none; /* Firefox */
`;

const SymptomButton = styled.button<{ selected: boolean }>`
  padding: 10px 16px;
  height:40px;
  border-radius: 400px;
  border: 1px solid
    ${(props) =>
      props.selected ? theme.colors.primary : theme.colors.white_e5};
  background-color: ${(props) =>
    props.selected ? theme.colors.tertiary : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`;

const SymptomText = styled.p<{ selected: boolean }>`
  font-size: 16px;
  color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : theme.colors.gray_7};
`;