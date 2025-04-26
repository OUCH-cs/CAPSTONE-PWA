import styled from "@emotion/styled";
import { GenderSelectionItem } from "@/entities/auth/ui";
import { ControllerProps } from "../../sign-up.types";

export default function GenderSelection({
  value,
  onChange,
}: ControllerProps<"MALE" | "FEMALE">) {
  return (
    <GenderSelectionWrapper>
      <GenderSelectionItem
        isSelected={value === "MALE"}
        onClick={() => onChange("MALE")}
      >
        Male
      </GenderSelectionItem>
      <GenderSelectionItem
        isSelected={value === "FEMALE"}
        onClick={() => onChange("FEMALE")}
      >
        Female
      </GenderSelectionItem>
    </GenderSelectionWrapper>
  );
}

const GenderSelectionWrapper = styled.div`
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.white_e5};
  background-color: ${({ theme }) => theme.colors.white};
`;
