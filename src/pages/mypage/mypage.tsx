import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import Header from "@/features/mypage/ui/Header";
import Main from "@/features/mypage/ui/Main";
import Action from "@/features/mypage/ui/Action";
import Bottom from "@/features/mypage/ui/Bottom";

function Mypage() {
  return (
    <Container>
      <Header />
      <Main />
      <Action />
      <Bottom />
    </Container>
  );
}

export { Mypage };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.background};
  height: 90vh;
  overflow: hidden;
`;
