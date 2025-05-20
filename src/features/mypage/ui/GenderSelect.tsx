import styled from "@emotion/styled";
interface ControllerProps<T> {
  value: T;
  onChange: (value: T) => void;
}


export default function GenderSelect({
  value,
  onChange,
}: ControllerProps<"MALE" | "FEMALE">) {
  return (
    <GenderSelectWrapper>
      <GenderSelectItem
        type="button"
        isSelected={value === "MALE"}
        onClick={() => onChange("MALE")}
      >
        <GenderSelectContent isSelected={value === "MALE"}>
          male
        </GenderSelectContent>
      </GenderSelectItem>
      <GenderSelectItem
        type="button"
        isSelected={value === "FEMALE"}
        onClick={() => onChange("FEMALE")}
      >
        <GenderSelectContent isSelected={value === "FEMALE"}>
          female
        </GenderSelectContent>
      </GenderSelectItem>
    </GenderSelectWrapper>
  );
}

const GenderSelectWrapper = styled.div`
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.white_e5};
  background-color: ${({ theme }) => theme.colors.white};
`;

const GenderSelectItem = styled.button<{ isSelected: boolean }>`
  flex: 1;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.white}; /* 배경 색상은 항상 흰색 */
  border: none; /* 버튼 자체의 border 제거 */
  cursor: pointer;
`;

const GenderSelectContent = styled.div<{ isSelected: boolean }>`
  padding: 18px 0;
  font-size: 16px;
  font-weight: 400;
  color: ${({ isSelected }) => (isSelected ? "#000" : "#888")};
  border: 1px solid ${({ isSelected }) =>
    isSelected ? "#000000" : "transparent"}; /* 선택된 항목에만 border 적용 */
  border-radius: 10px; /* 경계 둥글게 처리 */
  text-align: center;
`;
