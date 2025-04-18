import { isAuthAtom } from "@/features/sign-in/services/atoms";
import styled from "@emotion/styled";
import { useSetAtom } from "jotai";

function Mypage() {
  const setIsAuth = useSetAtom(isAuthAtom);

  return (
    <Container>
      <button
        onClick={() => {
          setIsAuth(false);
        }}
      >
        로그아웃
      </button>
    </Container>
  );
}

export { Mypage };

const Container = styled.div``;
