import styled from "@emotion/styled";

const LoadingOverlay = () => {
  return (
    <Overlay>
      <Spinner>Submitting...</Spinner>
    </Overlay>
  );
};

export default LoadingOverlay;

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Spinner = styled.div`
  color: white;
  font-size: 18px;
  background-color: #333;
  padding: 1rem 2rem;
  border-radius: 8px;
`;