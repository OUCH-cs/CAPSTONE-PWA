import styled from "@emotion/styled";
import TabBar from "./TabBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      {children}
      <TabBar />
    </Container>
  );
}

const Container = styled.div`
  min-width: 360px;
  max-width: 600px;
  height: 100vh;
  padding-bottom: 52px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.background};
`;
