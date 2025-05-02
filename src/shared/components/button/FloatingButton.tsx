import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import CreateDiagnosis from "@/shared/assets/home/CreateDiagnosis.svg?react"
import NewButton from "@/shared/assets/records/NewButton.svg?react"
import MapButton from "@/shared/assets/search/MapButton.svg?react"
import theme from "@/shared/styles/theme";
import type { JSX } from "react";

/**
 * @type {Object} ConfigItem
 * @property {string} text - 버튼에 표시할 텍스트
 * @property {JSX.Element} icon - 버튼에 사용할 아이콘 SVG 컴포넌트
 * @property {string} to - 버튼 클릭 시 이동할 경로
 */

interface ConfigItem {
    text: string;
    icon: JSX.Element;
    to: string;
  }

const configMap: {[key: string]:ConfigItem} = {
    "/diagnosis-list": {
      text: "New",
      icon: <CreateDiagnosis/>,
      to: "/self-diagnosisFAQ",
    },
    "/search": {
      text: "View Map",
      icon: <MapButton/>,
      to: "/",
    },
    "/records/medicalrecord-list": {
        text: "New",
        icon: <NewButton/>,
        to: "/records/medicalrecord-add",
      },
      "/records/healthstatus-record-list": {
        text: "New",
        icon: <NewButton/>,
        to: "/records/healthstatus-add",
      },
  };


function FloatingButton() {
const location = useLocation();

  const current = configMap[location.pathname];
  
  return (
    <Container>
        <Link to={current.to}> 
            <ActionButton pathname={location.pathname}>
                {current.icon}
                <ButtonText>{current.text}</ButtonText>
            </ActionButton>
        </Link>
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

/**
 * @styled ActionButton
 * @param {string} pathname - 현재 경로에 따라 크기 조절
 * @description 아이콘과 텍스트가 포함된 플로팅 버튼
 */

const ActionButton = styled.button<{ pathname: string }>`
  border: none;
  gap:7px;

  width: ${({ pathname }) => {
    if (pathname.startsWith("/records")) {
        return "78px";
      }
    switch (pathname) {
      case "/search":
        return "120px";
      case "/review":
        return "40px";
      default:
        return "83px";
    }
  }};
  
  height: ${({pathname})=>
    (pathname ==="/review" ? "40px" : "46px")};

  border-radius: ${({ pathname }) =>
    pathname === "/review" ? "20px" : "100px"};

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

`