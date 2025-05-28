import { TabBar } from "@/shared/components/base";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

function TabBarLayout() {
  return (
    <Container>
      <Outlet />
      <TabBar />
    </Container>
  );
}

export { TabBarLayout };

const Container = styled.div`
  padding-bottom: 52px;
`;
