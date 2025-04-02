import { useAccordionContext } from "@/shared/lib/useAccordionContext";
import styled from "@emotion/styled";

function AccordionItem({ children }: { children: React.ReactNode }) {
  const { toggleAccrodion } = useAccordionContext();

  return <Container onClick={toggleAccrodion}>{children}</Container>;
}

export { AccordionItem };

const Container = styled.div`
  cursor: pointer;
`;
