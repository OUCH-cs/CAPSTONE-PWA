import styled from "@emotion/styled";
import { TabBar } from "./TabBar";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      {children}
      <TabBar />
    </Container>
  );
}

export { RootLayout };

const Container = styled.div`
  min-width: 360px;
  max-width: 450px;
  height: 100vh;
  padding-bottom: 52px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.background};
`;
