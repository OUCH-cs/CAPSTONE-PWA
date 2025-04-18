import { useAccordionContext } from "@/shared/lib/useAccordionContext";
import styled from "@emotion/styled";

function AccordionTrigger({ children }: { children: React.ReactNode }) {
  const { isOpen } = useAccordionContext();

  return <Container $isOpen={isOpen}>{children}</Container>;
}

export { AccordionTrigger };

const Container = styled.div<{ $isOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.5s;
  background-color: transparent;
`;
