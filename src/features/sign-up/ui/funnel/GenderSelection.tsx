import styled from "@emotion/styled";
import { GenderSelectionItem } from "@/entities/auth/ui";

export default function GenderSelection() {
  return (
    <GenderSelectionWrapper>
      <GenderSelectionItem isSelected={true} onClick={() => {}}>
        Male
      </GenderSelectionItem>
      <GenderSelectionItem isSelected={false} onClick={() => {}}>
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
