import { Accordion } from "@/shared/components/accordion";
import styled from "@emotion/styled";
import ArrowChevronIcon from "@/shared/assets/common/arrow.svg?react";
import theme from "@/shared/styles/theme";
import { GuideAccoridoinProps } from "../../translate.types";

export default function GuideAccordion({
  data,
}: {
  data: GuideAccoridoinProps;
}) {
  return (
    <Accordion>
      <Accordion.Header>
        <AccordionHeaderWrapper>
          <AccordionHeaderTitle>{data.title}</AccordionHeaderTitle>
          <Accordion.Trigger>
            <ArrowChevronIcon width={20} height={20} stroke="#000" />
          </Accordion.Trigger>
        </AccordionHeaderWrapper>
      </Accordion.Header>

      <Accordion.Body>
        <AccordionBodyWrapper>
          {data.text.map((item, idx) => (
            <AccordionItem key={idx}>{`${idx + 1}. ${item.en}`}</AccordionItem>
          ))}
        </AccordionBodyWrapper>
      </Accordion.Body>
    </Accordion>
  );
}

const AccordionHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 328px;
  height: 56px;
  padding: 0 18px;
  border-radius: 10px 10px;
  background-color: ${theme.colors.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
`;

const AccordionHeaderTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #000000;
`;

const AccordionBodyWrapper = styled.ul`
  width: 328px;
`;

const AccordionItem = styled.li`
  width: inherit;
  height: fit-content;
  padding: 18px;
  border-bottom: 1px solid ${theme.colors.white_e5};
  background-color: ${theme.colors.white_f1};

  &:last-child {
    border-bottom: none;
    border-radius: 0 0 10px 10px;
  }
`;
