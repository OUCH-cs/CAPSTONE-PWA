import { useAccordionContext } from "@/shared/lib/useAccordionContext";
import styled from "@emotion/styled";

interface AccordionItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

function AccordionItem({ children, onClick }: AccordionItemProps) {
  const { toggleAccordion } = useAccordionContext();

  const handleClick = () => {
    onClick?.();
    toggleAccordion();
  };

  return <Container onClick={handleClick}>{children}</Container>;
}

export { AccordionItem };

const Container = styled.div`
  cursor: pointer;
`;
