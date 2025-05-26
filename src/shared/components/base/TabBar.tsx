import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import MainIcon from "@/shared/assets/common/main-tab.svg?react";
import SearchIcon from "@/shared/assets/common/search-tab.svg?react";
import TranslateIcon from "@/shared/assets/common/translate-tab.svg?react";
import RecordsIcon from "@/shared/assets/common/records-tab.svg?react";
import MyPageIcon from "@/shared/assets/common/mypage-tab.svg?react";
import { useAtom } from "jotai";
import { isAuthAtom } from "@/features/sign-in/services/atoms";

function TabBar() {
  const location = useLocation();
  const [tab, setTab] = useState<string>(location.pathname);
  const [isAuth] = useAtom(isAuthAtom);

  useEffect(() => {
    setTab(location.pathname);
  }, [location.pathname]);

  if (!isAuth) return null;
  return (
    <Container>
      <TabItem to="/" $isSelected={tab === "/"} onClick={() => setTab("/")}>
        <MainIcon />
      </TabItem>
      <TabItem
        to="/search"
        $isSelected={tab.startsWith("/search") || tab.startsWith("/map")}
        onClick={() => setTab("/search")}
      >
        <SearchIcon />
      </TabItem>
      <TabItem
        to="/translate"
        $isSelected={tab.startsWith("/translate")}
        onClick={() => setTab("/translate")}
      >
        <TranslateIcon />
      </TabItem>
      <TabItem
        to="/records"
        $isSelected={tab.startsWith("/records")}
        onClick={() => setTab("/records")}
      >
        <RecordsIcon />
      </TabItem>
      <TabItem
        to="/mypage"
        $isSelected={tab.startsWith("/mypage")}
        onClick={() => setTab("/mypage")}
      >
        <MyPageIcon />
      </TabItem>
    </Container>
  );
}

export { TabBar };

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: 360px;
  max-width: 450px;
  height: 52px;
  padding: 0 30px;
  border-top: 1px solid ${({ theme }) => theme.colors.white_f5};
  background-color: #fbfdff;
  z-index: 100;
`;

const TabItem = styled(Link, {
  shouldForwardProp: (prop) => prop !== "$isSelected",
})<{ $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 100%;
  cursor: pointer;
  position: relative;
  color: ${({ $isSelected }) => ($isSelected ? "#0097A7" : "#354A4D")};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ $isSelected, theme }) =>
      $isSelected ? theme.colors.primary : "transparent"};
    border-radius: 100px;
    opacity: ${({ $isSelected }) => ($isSelected ? 1 : 0)};
    transition: opacity 1.2s;
  }
`;
