import { useAccordionContext } from "@/shared/lib/useAccordionContext";
import styled from "@emotion/styled";

function AccordionItem({ children }: { children: React.ReactNode }) {
  const { toggleAccordion } = useAccordionContext();

  return <Container onClick={toggleAccordion}>{children}</Container>;
}

export { AccordionItem };

const Container = styled.div`
  cursor: pointer;
`;
