import styled from "@emotion/styled";

function RootLayout({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}

export { RootLayout };

const Container = styled.div`
  min-width: 360px;
  max-width: 450px;
  min-height: 100vh;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.background};
`;
