import { useState } from "react";
import styled from "@emotion/styled";

type Props = {
  onClose: () => void;
  onSave: (data: string) => void;
};

export default function MedicineHistoryPart({ onClose, onSave }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [medicinehistory, setMedicineHistory] = useState<{ text: string }[]>([]);

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      setMedicineHistory((prev) => [...prev, { text: inputValue.trim() }]);
      setInputValue("");
    }
  };

  const handleDelete = (index: number) => {
    setMedicineHistory((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (medicinehistory.length > 0) {
      const combinedText = medicinehistory.map(item => item.text).join(", ");
      onSave(combinedText);
      onClose();
    }
  };

  return (
    <Overlay>
      <Container>
        <Header>
          <Title>Medicine History</Title>
        </Header>

        <InputWrapper>
          <Input
            type="text"
            placeholder="Medication / Type of medication / Date taken"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <AddButton onClick={handleAdd}>＋</AddButton>
        </InputWrapper>

        {medicinehistory.map((entry, index) => (
          <Entry key={index}>
            <span>{entry.text}</span>
            <DeleteButton onClick={() => handleDelete(index)}>－</DeleteButton>
          </Entry>
        ))}

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
  width: 388px;
  height: 700px;
  margin-top: 140px;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 400;
  margin-top: 28px;
`;

const InputWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: 16px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  zoom: 1.0;
  -webkit-text-size-adjust: 100%;
`;

const AddButton = styled.button`
  position: absolute;
  right: 4px;
  font-size: 20px;
  background-color: #fff;
  color: rgba(0, 0, 0, 1);
  border: none;
  border-radius: 8px;
  padding: 7px;
  margin-bottom: 2px;
  cursor: pointer;
`;

const Entry = styled.div`
  background-color: white;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 33px;
  background-color: transparent;
  border: none;
  font-size: 12px;
  color: rgba(0, 0, 0, 1);
  cursor: pointer;
`;

const SaveButton = styled.button`
  position: absolute;
  margin-top: 200px;
  padding: 13px 150px;
  background-color: #0097a7;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;
