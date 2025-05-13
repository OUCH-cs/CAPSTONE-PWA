import { useState } from "react";
import styled from "@emotion/styled";

type Props = {
  onClose: () => void;
  onSave: (data: { fasting: string; postprandial: string }) => void;
};

export default function BloodSugarPart({ onClose, onSave }: Props) {
  const [fasting, setFasting] = useState("");
  const [postprandial, setPostPrandial] = useState("");

  const handleSave = () => {
    if (fasting && postprandial) {
      onSave({ fasting, postprandial });
      onClose();
    }
  };

  return (
    <Overlay>
      <Container>
        <SectionTitle>Blood Sugar</SectionTitle>

        <Card>
          <Box>
            <InputContainer>
              <StyledInputFasting
                type="number"
                value={fasting}
                onChange={(e) => setFasting(e.target.value)}
              />
              <LabelLeft>Fasting</LabelLeft>
            </InputContainer>
          </Box>

          <Box>
            <InputContainer>
              <StyledInput
                type="number"
                value={postprandial}
                onChange={(e) => setPostPrandial(e.target.value)}
              />
              <LabelRight>Postprandial</LabelRight>
            </InputContainer>
          </Box>
        </Card>

        <UnitText>mg/dL</UnitText>

        <SaveButton onClick={handleSave}>Save</SaveButton>
      </Container>
    </Overlay>
  );
}


const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Container = styled.div`
  background-color: rgba(245, 249, 252, 1);
  border-radius: 20px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
  height: 710px;
  top: 75px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SectionTitle = styled.div`
  font-size: 18px;
  margin-top: 48px;
  font-weight: 500;
  margin-bottom: 12px;
`;

const Card = styled.div`
  display: flex;
  gap: 16px;
`;

const Box = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  margin-top: 21px;
  position: relative;
  width: 100%;
`;
const StyledInputFasting = styled.input`
  width: 160px;
  height: 160px;
  color:#767676;
  font-size: 32px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
   /* 🔽 스핀 버튼 제거 (크롬, 사파리) */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* 🔽 스핀 버튼 제거 (파이어폭스) */
  -moz-appearance: textfield;
`;
const StyledInput = styled.input`
  width: 160px;
  height: 160px;
  font-size: 32px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
   /* 🔽 스핀 버튼 제거 (크롬, 사파리) */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* 🔽 스핀 버튼 제거 (파이어폭스) */
  -moz-appearance: textfield;
`;

const LabelLeft = styled.label`
  position: absolute;
  top: 10px;
  left: 49%;
  transform: translateX(-50%);
  font-size: 14px;
  color: #555;
`;

const LabelRight = styled.label`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  color: #555;
`;

const UnitText = styled.div`
  text-align: right;
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  margin-top: 5px;
`;

const SaveButton = styled.button`
  align-self: center;
  padding: 13px 80px;
  background-color: #0097a7;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 40px;
`;
