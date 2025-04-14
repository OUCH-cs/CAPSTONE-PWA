import { useState } from "react";
import styled from "@emotion/styled";
import DateSelection from "./DateSelection";
import {initialMedicalFormData} from "../consts/medicalConstants"



export default function MedicalAddData() {
  const [medicalData, setMedicalData] = useState(initialMedicalFormData);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleDateSelect = (selectedDate: string) => {
    setMedicalData((prevData) =>
      prevData.map((item) =>
        item.title === "Date of Visit" ? { ...item, value: selectedDate } : item
      )
    );
    setDateModalOpen(false);
  };

  return (
    <Container>
      {medicalData.map((item, index) => {
        const isSelected = selectedIndex === index;

        return (
          <div key={index}>
            <Label isSelected={isSelected}>{item.title}</Label>

            {item.title === "Date of Visit" ? (
              <List
                isSelected={isSelected}
                onClick={() => {
                  setSelectedIndex(index);
                  setDateModalOpen(true);
                }}
              >
                <DateText isFilled={!!item.value}>
                  {item.value}
                </DateText>
              </List>
            ) : (
              <List isSelected={isSelected} onClick={() => setSelectedIndex(index)}>
                <Input
                  type="text"
                  value={item.value}
                  onChange={(e) =>
                    setMedicalData((prev) =>
                      prev.map((data, i) =>
                        i === index ? { ...data, value: e.target.value } : data
                      )
                    )
                  }
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
  min-height: 100vh;
`;

const Label = styled.div<{ isSelected: boolean }>`
  margin-top: 26px;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 400;
  font-family: Pretendard;
  color: ${(props) =>
    props.isSelected ? "rgba(0, 151, 167, 1)" : "rgba(67, 67, 67, 1)"};
`;

const List = styled.div<{ isSelected: boolean }>`
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  height: 60px;
  margin-bottom: 0;
  border-bottom: ${(props) =>
    props.isSelected ? "1px solid rgba(0, 151, 167, 1)" : "1px solid #f5f5f5"};
  cursor: pointer;
`;

const DateText = styled.span<{ isFilled: boolean }>`
  font-size: 16px;
  font-weight: 400;
  font-family: Pretendard;
  color: ${(props) => (props.isFilled ? "rgba(0, 0, 0, 1)" : "#767676")};
`;

const Input = styled.input`
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  font-family: Pretendard;
  outline: none;
  border: none;
  background-color: transparent;
  width: 100%;
  margin-top: -10px;
`;
