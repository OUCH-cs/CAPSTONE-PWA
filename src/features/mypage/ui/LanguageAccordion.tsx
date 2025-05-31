import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Accordion } from "@/shared/components/accordion";
import { LANGUAGE_LIST } from "@/features/mypage/MyPage.constants";
import ArrowChevronIcon from "@/shared/assets/common/arrow.svg?react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/shared/services/useLanguage";

export default function LanguageAccordionEdit() {
  const { t } = useTranslation();
  const { languageCode, handleLangChange } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<string>("");

  useEffect(() => {
    const matchedItem = LANGUAGE_LIST.find((item) => item.code === languageCode);
    setSelectedItem(matchedItem ? matchedItem.label : "");
  }, [languageCode]);

  return (
    <Accordion>
      <Accordion.Header>
        <AccordionHeaderWrapper>
          <AccordionHeaderTitle $isSelected={!!selectedItem}>
            {selectedItem || t("Language Settings")}
          </AccordionHeaderTitle>
          <Accordion.Trigger>
            <StyledArrowIcon />
          </Accordion.Trigger>
        </AccordionHeaderWrapper>
      </Accordion.Header>

      <Accordion.Body>
        <AccordionBodyWrapper>
          {LANGUAGE_LIST.map(({ code, label }) => (
            <Accordion.Item key={code} onClick={() => handleLangChange({ target: { value: code } } as any)}>
              <AccordionItemWrapper $isSelected={languageCode === code}>
                {label}
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

const StyledArrowIcon = styled(ArrowChevronIcon)`
  width: 24px;
  height: 24px;
  fill: ${({ theme }) => theme.colors.gray_7};
`;
