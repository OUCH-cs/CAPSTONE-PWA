import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Accordion } from "@/shared/components/accordion";
import { COUNTRY_LIST } from "@/features/sign-up/sign-up.constants";
// 추후 API연동시 countryList부분 동적으로 불러올 예정입니다!
import ArrowChevronIcon from "@/shared/assets/common/arrow.svg?react";
interface ControllerProps<T> {
  value: T;
  onChange: (value: T) => void;
}

export default function CountryAccordionEdit({
  value,
  onChange,
}: ControllerProps<string>) {
  const [selectedItem, setSelectedItem] = useState<string>("");

  useEffect(() => {
    const matchedItem = COUNTRY_LIST.find((item) => item.code === value);
    setSelectedItem(matchedItem?.name ?? "");
  }, [value]);

  return (
    <Accordion>
      <Accordion.Header>
        <AccordionHeaderWrapper>
          <AccordionHeaderTitle $isSelected={!!selectedItem}>
            {selectedItem || "Select your country"}
          </AccordionHeaderTitle>
          <Accordion.Trigger>
            <StyledArrowIcon />
          </Accordion.Trigger>
        </AccordionHeaderWrapper>
      </Accordion.Header>

      <Accordion.Body>
        <AccordionBodyWrapper>
          {COUNTRY_LIST.map(({ code, name }) => (
            <Accordion.Item key={code} onClick={() => onChange(code)}>
              <AccordionItemWrapper $isSelected={value === code}>
                {name}
              </AccordionItemWrapper>
            </Accordion.Item>
          ))}
        </AccordionBodyWrapper>
      </Accordion.Body>
    </Accordion>
  );
}

const AccordionHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.colors.white_e5};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const AccordionHeaderTitle = styled.div<{ $isSelected: boolean }>`
  font-size: 16px;
  font-weight: 400;
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.black : theme.colors.gray_7};
`;

const AccordionBodyWrapper = styled.div`
  max-height: 280px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  overflow-y: auto;
`;

const AccordionItemWrapper = styled.div<{ $isSelected: boolean }>`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 56px;
  padding-left: 18px;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.tertiary : "transparent"};
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
`;

// 아이콘 크기와 색상 강제 지정 (임시 스타일)
const StyledArrowIcon = styled(ArrowChevronIcon)`
  width: 24px;
  height: 24px;
  fill: ${({ theme }) => theme.colors.gray_7};
`;
