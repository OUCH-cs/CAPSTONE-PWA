import { Link } from "react-router-dom";
import { useState } from "react";
import styled from "@emotion/styled";
import { TabBarType } from "../types/tab-bar.types";
import MainIcon from "@/shared/assets/common/main-tab.svg?react";
import SearchIcon from "@/shared/assets/common/search-tab.svg?react";
import TranslateIcon from "@/shared/assets/common/translate-tab.svg?react";
import RecordsIcon from "@/shared/assets/common/records-tab.svg?react";
import MyPageIcon from "@/shared/assets/common/mypage-tab.svg?react";

export default function TabBar() {
  const [tab, setTab] = useState<TabBarType>("main");

  return (
    <Container>
      <TabItem
        to="/"
        $isSelected={tab === "main"}
        onClick={() => setTab("main")}
      >
        <MainIcon />
      </TabItem>
      <TabItem
        to="/search"
        $isSelected={tab === "search"}
        onClick={() => setTab("search")}
      >
        <SearchIcon />
      </TabItem>
      <TabItem
        to="/translate"
        $isSelected={tab === "translate"}
        onClick={() => setTab("translate")}
      >
        <TranslateIcon />
      </TabItem>
      <TabItem
        to="/records"
        $isSelected={tab === "records"}
        onClick={() => setTab("records")}
      >
        <RecordsIcon />
      </TabItem>
      <TabItem
        to="/mypage"
        $isSelected={tab === "mypage"}
        onClick={() => setTab("mypage")}
      >
        <MyPageIcon />
      </TabItem>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 52px;
  padding: 0 30px;
  border-top: 1px solid ${({ theme }) => theme.colors.white_f5};
  background-color: #fbfdff;
  z-index: 100;
`;

const TabItem = styled(Link)<{ $isSelected: boolean }>`
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
  }
`;
