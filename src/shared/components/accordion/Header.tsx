import styled from "@emotion/styled";
import { useAccordionContext } from "@/shared/lib/useAccordionContext";

/**
 * AccordionHeader 컴포넌트는 아코디언의 헤더를 제공합니다.
 *
 * @param {ReactNode} children - 아코디언의 내용.
 *
 */

function AccordionHeader({ children }: { children: React.ReactNode }) {
  const { toggleAccordion } = useAccordionContext();

  return <Container onClick={toggleAccordion}>{children}</Container>;
}

export { AccordionHeader };

const Container = styled.div`
  width: inherit;
  cursor: pointer;
`;
