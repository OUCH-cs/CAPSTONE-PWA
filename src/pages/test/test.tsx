import { Accordion } from "@/shared/components/accordion";
import { Button } from "@/shared/components/button/Button";
import styled from "@emotion/styled";
import { useState } from "react";
import ArrowIcon from "@/shared/assets/common/arrow.svg?react";

export default function TestPage() {
  const [selectedItem, setSelectedItem] = useState<string>("");

  return (
    <div>
      {/* 아코디언 루트 컨테이너 */}
      <Accordion>
        {/* 아코디언 헤더 */}
        <Accordion.Header>
          <AccordionHeaderWrapper>
            <h1>{selectedItem || "Gender"}</h1>

            {/* 아코디언 아이콘 컨테이너 */}
            <Accordion.Trigger>
              <ArrowIcon />
            </Accordion.Trigger>
          </AccordionHeaderWrapper>
        </Accordion.Header>

        {/* 아코디언 콘텐츠 */}
        <Accordion.Body>
          {/* 아코디언 콘텐츠 */}
          <BodyWrapper>
            <Accordion.Item>
              <ItemWrapper onClick={() => setSelectedItem("MALE")}>
                MALE
              </ItemWrapper>
            </Accordion.Item>
            <Accordion.Item>
              <ItemWrapper onClick={() => setSelectedItem("FEMALE")}>
                FEMALE
              </ItemWrapper>
            </Accordion.Item>
          </BodyWrapper>
        </Accordion.Body>
      </Accordion>
      <Accordion>
        {/* 아코디언 헤더 */}
        <Accordion.Header>
          <AccordionHeaderWrapper>
            <h1>Description</h1>

            {/* 아코디언 아이콘 컨테이너 */}
            <Accordion.Trigger>
              <ArrowIcon />
            </Accordion.Trigger>
          </AccordionHeaderWrapper>
        </Accordion.Header>

        {/* 아코디언 콘텐츠 */}
        <Accordion.Body>
          {/* 아코디언 콘텐츠 */}
          <BodyWrapper>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sed,
            voluptate quos eum velit assumenda omnis, corporis cum quaerat
            beatae deleniti quas aliquam incidunt eligendi libero adipisci
            temporibus id harum!
          </BodyWrapper>
        </Accordion.Body>
      </Accordion>

      <Button>Next</Button>
    </div>
  );
}

const AccordionHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: inherit;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 15px;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  cursor: pointer;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ItemWrapper = styled.div`
  width: 80px;
  background-color: rgb(226, 219, 219);
`;
