import styled from "@emotion/styled";
import { useAccordionContext } from "@/shared/lib/useAccordionContext";

/**
 * AccordionBody 컴포넌트는 아코디언의 내용을 감싸는 컨테이너를 제공합니다.
 *
 * @param {ReactNode} children - 아코디언의 내용.
 */

function AccordionBody({ children }: { children: React.ReactNode }) {
  const { isOpen, parentRef, childRef } = useAccordionContext();

  return (
    <Container ref={parentRef} $isOpen={isOpen}>
      <BodyWrapper ref={childRef} $isOpen={isOpen}>
        {children}
      </BodyWrapper>
    </Container>
  );
}

export { AccordionBody };

const Container = styled.div<{ $isOpen: boolean }>`
  height: 0;
  transition: height 0.5s ease;

  // opacity 애니메이션 -> 슬라이더 애니메이션 사용하려면 주석 처리
  // overflow: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  // opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};

  // 슬라이더 애니메이션 (대신 dropdown이 가려지는 버그 발생 -> createPortal 사용)
  overflow: hidden;
`;

const BodyWrapper = styled.div<{ $isOpen: boolean }>`
  height: auto;
  background-color: transparent;

  // opacity 애니메이션 -> 슬라이더 애니메이션 사용하려면 주석 처리
  // transition: opacity 0.5s ease-in-out;
  // opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
`;
