import styled from "@emotion/styled";

interface MedicalRecordDeleteProps {
  onCancel: () => void;
  onConfirm: () => void;
  message?: React.ReactNode;
}

export default function MedicalRecordDelete({
  onCancel,
  onConfirm,
  message = "Do you want to delete a medical record?",
}: MedicalRecordDeleteProps) {
  return (
    <ModalOverlay>
      <ModalContent>
      <MessageText>{message}</MessageText>
        <ButtonWrapper>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
          <DeleteButton onClick={onConfirm}>Delete</DeleteButton>
        </ButtonWrapper>
      </ModalContent>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  text-align: center;
  width: 316px;
  font-family: Pretendard;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const CancelButton = styled.button`
  flex: 1;
  background-color: #eee;
  border: none;
  border-radius: 8px;
  font-weight: 500;
`;

const DeleteButton = styled.button`
  flex: 1;
  background-color: #0097a7;
  color: white;
  border: none;
  padding: 16px;
  font-weight: 500;
`;
const MessageText = styled.p`
  font-size: 18px;
  color: #000;
  padding-top:56px;
  padding-bottom:26px;
  font-family: Pretendard;
  font-weight:400;
  line-height: 21px;
  text-align: center;
`;


