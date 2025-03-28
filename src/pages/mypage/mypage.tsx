import Modal from "@/shared/components/modal/Modal";
import useToggle from "@/shared/hooks/useToggle";
import styled from "@emotion/styled";

function Mypage() {
  const { isOpen, toggle } = useToggle();

  return (
    <Container>
      <button onClick={toggle}>trigger</button>

      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalWrapper>
          <h1>hi</h1>
        </ModalWrapper>
      </Modal>
    </Container>
  );
}

export { Mypage };

const Container = styled.div``;

const ModalWrapper = styled.div`
  width: 300px;
  height: 300px;
  background-color: white;
`;
