import styled from "@emotion/styled";
import { AccordionProvider } from "@/app/providers/AccordionContext.tsx";
import { AccordionHeader } from "./Header.tsx";
import { AccordionBody } from "./Body.tsx";
import { AccordionTrigger } from "./Trigger.tsx";
import { AccordionItem } from "./Item.tsx";

/**
 * Accordion 컴포넌트는 아코디언의 구성요소(Header, Body, Trigger, Item)를 감싸는 컨테이너 컴포넌트입니다.
 *
 * @component
 *
 * @param {ReactNode} children - 아코디언 내부에 들어갈 내용 (예: Header, Body, Item 등).
 *
 * @description
 * - **Header**: 아코디언의 헤더를 제공하며, 클릭 시 아코디언의 열림/닫힘 상태를 제어합니다.
 * - **Trigger**: 헤더 내부에서 사용되며, 열림/닫힘 상태를 시각적으로 표시하는 아이콘이나 버튼을 포함합니다.
 * - **Body**: 아코디언의 내용을 감싸는 컨테이너로, 자유롭게 스타일링 가능합니다.
 * - **Item**: 선택 가능한 아코디언에서 사용되며, 클릭 시 아코디언이 닫히도록 구현되어 있습니다.
 *
 * @example
 * 사용 예시
 * ```tsx
 * <Accordion>
 *   <Accordion.Header>
 *     <div>Header Content</div>
 *
 *     <Accordion.Trigger>
 *       <ArrowIcon />
 *     </Accordion.Trigger>
 *   </Accordion.Header>
 *
 *   <Accordion.Body>
 *  <div>
 *     <Accordion.Item>
 *       <div>Item 1</div>
 *     </Accordion.Item>
 *
 *     <Accordion.Item>
 *       <div>Item 2</div>
 *     </Accordion.Item>
 *   </Accordion.Body>
 *  </div>
 * </Accordion>
 * ```
 */
function Accordion({ children }: { children: React.ReactNode }) {
  return (
    <AccordionProvider>
      <AccordionContainer>{children}</AccordionContainer>
    </AccordionProvider>
  );
}

Accordion.displayName = "Accordion";
Accordion.Header = AccordionHeader;
Accordion.Trigger = AccordionTrigger;
Accordion.Body = AccordionBody;
Accordion.Item = AccordionItem;

export { Accordion };

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
`;
