import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Accordion } from "@/shared/components/accordion";
import { COUNTRY_LIST } from "../../sign-up.constants";
import ArrowChevronIcon from "@/shared/assets/common/arrow.svg?react";
import { ControllerProps, Country } from "../../sign-up.types";

export default function CountryAccordion({
  value,
  onChange,
}: ControllerProps<number>) {
  const [selectedItem, setSelectedItem] = useState<Country | "">("");

  useEffect(() => {
    const matchedItem = COUNTRY_LIST.find((item) => item.id === value);
    setSelectedItem(matchedItem?.name ?? "");
  }, [value]);

  return (
    <Accordion>
      <Accordion.Header>
        <AccordionHeaderWrapper>
          <AccordionHeaderTitle $isSelected={!!selectedItem}>
            {selectedItem || "Country"}
          </AccordionHeaderTitle>
          <Accordion.Trigger>
            <ArrowChevronIcon />
          </Accordion.Trigger>
        </AccordionHeaderWrapper>
      </Accordion.Header>

      <Accordion.Body>
        <AccordionBodyWrapper>
          {COUNTRY_LIST.map(({ id, name }) => (
            <Accordion.Item key={id} onClick={() => onChange(id)}>
              <AccordionItemWrapper $isSelected={value === id}>
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
  width: 328px;
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
