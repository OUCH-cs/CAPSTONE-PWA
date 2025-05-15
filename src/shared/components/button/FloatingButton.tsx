import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import theme from "@/shared/styles/theme";
import type { JSX } from "react";

/**
 *
 * @props {string} [text] - 버튼에 표시할 텍스트 (선택)
 * @props {JSX.Element} icon - 버튼에 표시할 아이콘 (필수)
 * @props {string} [to] - 버튼 클릭 시 이동할 경로 (react-router Link용)
 * @props {() => void} [onClick] - 버튼 클릭 시 실행할 함수 (예: 모달 열기)
 * @props {string} [width="83px"] - 버튼의 너비 (기본값: 83px)
 * @props {string} [height="46px"] - 버튼의 높이 (기본값: 46px)
 * @props {string} [borderRadius="100px"] - 버튼의 border-radius (기본값: 100px)
 */

interface FloatingButtonProps {
  text?: string;
  icon: JSX.Element;
  to?: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  borderRadius?: string;
}

function FloatingButton({
  text,
  icon,
  to,
  onClick,
  width = "83px",
  height = "46px",
  borderRadius = "100px",
}: FloatingButtonProps) {
  const buttonContent = (
    <ActionButton
      as={to ? "button" : "div"}
      style={{ width, height, borderRadius }}
      onClick={onClick}
    >
      {icon}
      {text && <ButtonText>{text}</ButtonText>}
    </ActionButton>
  );

  return (
    <Container>
      {to ? <Link to={to}>{buttonContent}</Link> : buttonContent}
    </Container>
  );
}

export { FloatingButton };


const Container = styled.div`
  position: fixed;
  bottom: 80px;
  right: 16px;

  @media (min-width: 480px) {
    right: calc(50% - 240px + 30px);
  }

  @media (min-width: 768px) {
    right: calc(50% - 240px + 30px);
  }
`;

const ActionButton = styled.button`
  border: none;
  gap: 7px;
  background-color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  white-space: nowrap;
  cursor: pointer;
  font-size: 14px;
`;

const ButtonText = styled.span`
  font-size: 16px;
`;