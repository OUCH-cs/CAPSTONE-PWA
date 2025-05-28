import { useState } from "react";
import styled from "@emotion/styled";
import DateSelection from "./DateSelection";
import { initialMedicalFormData } from "../consts/medicalConstants";
import { useTranslation } from "react-i18next";

interface MedicalAddDataProps {
  onDataChange: (data: any) => void; 
}

export default function MedicalAddData({ onDataChange }: MedicalAddDataProps) {
  const {t} = useTranslation();
  const [medicalData, setMedicalData] = useState(initialMedicalFormData);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleDateSelect = (selectedDate: string) => {
    const updatedData = medicalData.map((item) =>
      item.title === "Date of Visit" ? { ...item, value: selectedDate } : item
    );
    setMedicalData(updatedData);
    onDataChange(updatedData); 
    setDateModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedData = medicalData.map((data, i) =>
      i === index ? { ...data, value: e.target.value } : data
    );
    setMedicalData(updatedData);
    onDataChange(updatedData); // 상위 컴포넌트로 변경된 데이터 전달
  };

  return (
    <Container>
      {medicalData.map((item, index) => {
        const isSelected = selectedIndex === index;

        return (
          <div key={index}>
            <Label>{t(item.title)}</Label>

            {item.title === "Date of Visit" ? (
              <List
                isSelected={isSelected}
                onClick={() => {
                  setSelectedIndex(index);
                  setDateModalOpen(true);
                }}
              >
                <DateText isFilled={!!item.value}>{item.value}</DateText>
              </List>
            ) : (
              <List isSelected={isSelected} onClick={() => setSelectedIndex(index)}>
                <Input
                  type="text"
                  value={item.value}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </List>
            )}
          </div>
        );
      })}

      <DateSelection
        isOpen={dateModalOpen}
        onClose={() => setDateModalOpen(false)}
        onDateSelect={handleDateSelect}
      />
    </Container>
  );
}

const Container = styled.div`
  background-color: #f5f9fc;
  
  
`;

const Label = styled.div`
  margin-top: 26px;
  margin-bottom: 6px;
  font-size: 18px;
  font-weight: 400;
  font-family: Pretendard;
  color: #000};
`;

const List = styled.div<{ isSelected: boolean }>`
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  height: 60px;
  border-radius:12px;
  margin-bottom: 0;
  border: ${(props) =>
    props.isSelected ? "1px solid rgba(0, 151, 167, 1)" : "1px solid #f5f5f5"};
  cursor: pointer;
`;

const DateText = styled.span<{ isFilled: boolean }>`
  font-size: 16px;
  font-weight: 400;
  font-family: Pretendard;
  color: ${(props) => (props.isFilled ? "#434343" : "#767676")};
`;

const Input = styled.input`
  font-size: 16px;
  font-weight: 400;
  color: #434343;
  font-family: Pretendard;
  outline: none;
  border: none;
  background-color: transparent;
  width: 100%;
  margin-top: -10px;
`;
