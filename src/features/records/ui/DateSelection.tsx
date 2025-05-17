import  { useRef, useEffect, useState } from "react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import Modal from "@/shared/components/modal/Modal"; 

const years = Array.from({ length: 100 }, (_, i) => (2000 + i).toString().slice(2));
const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));

interface DateSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (date: string) => void;
}

export default function DateSelection({ isOpen, onClose, onDateSelect }: DateSelectionProps) {
  const today = dayjs();
  const [centerItem, setCenterItem] = useState({
    year: today.format("YY"),
    month: today.format("MM"),
    day: today.format("DD"),
  });

  const scrollRefs = {
    year: useRef<HTMLDivElement>(null),
    month: useRef<HTMLDivElement>(null),
    day: useRef<HTMLDivElement>(null),
  };

  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const scrollToSelected = (type: "year" | "month" | "day", value: string) => {
    const ref = scrollRefs[type].current;
    const list = type === "year" ? years : type === "month" ? months : days;
    const index = list.indexOf(value);
    const itemHeight = 40;
    const pickerHeight = 150;

    if (ref && index !== -1) {
      const top = index * itemHeight - pickerHeight / 2 + itemHeight / 2;
      ref.scrollTo({ top, behavior: "auto" });
    }
  };

  const getClosestItemByCenterLine = (type: "year" | "month" | "day"): string | null => {
    const ref = scrollRefs[type].current;
    if (!ref) return null;

    const centerY = ref.scrollTop + ref.clientHeight / 2;
    let closestItem = null;
    let closestDiff = Infinity;

    const children = Array.from(ref.children).filter((child) =>
      (child as HTMLElement).dataset?.value
    ) as HTMLElement[];

    for (const child of children) {
      const childCenter = child.offsetTop + child.offsetHeight / 2;
      const diff = Math.abs(childCenter - centerY);
      if (diff < closestDiff) {
        closestDiff = diff;
        closestItem = child.dataset.value!;
      }
    }

    return closestItem;
  };

  const handleScroll = (type: "year" | "month" | "day") => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      const closest = getClosestItemByCenterLine(type);
      if (!closest) return;

      const list = type === "year" ? years : type === "month" ? months : days;
      const index = list.indexOf(closest);
      const itemHeight = 40;
      const ref = scrollRefs[type].current;

      if (ref) {
        const top = index * itemHeight - ref.clientHeight / 2 + itemHeight / 2;
        ref.scrollTo({ top, behavior: "smooth" });
      }

      setCenterItem((prev) => ({ ...prev, [type]: closest }));
    }, 50);
  };

  useEffect(() => {
    if (isOpen) {
      const now = dayjs();
      const currentYear = now.format("YY");
      const currentMonth = now.format("MM");
      const currentDay = now.format("DD");

      setCenterItem({ year: currentYear, month: currentMonth, day: currentDay });

      setTimeout(() => {
        scrollToSelected("year", currentYear);
        scrollToSelected("month", currentMonth);
        scrollToSelected("day", currentDay);
      }, 0);
    }
  }, [isOpen]);

  const handleSave = () => {
    const fullYear = `20${centerItem.year}`;
    const formattedDate = `${fullYear}.${centerItem.month}.${centerItem.day}`;
    onDateSelect(formattedDate);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalContent>
        <Title>Date of Visit</Title>
        <PickerWrapper>
          <CenterLine />
          <PickerContainer>
            {["year", "month", "day"].map((type) => {
              const list = type === "year" ? years : type === "month" ? months : days;

              return (
                <PickerColumn
                  key={type}
                  ref={scrollRefs[type as keyof typeof scrollRefs]}
                  onScroll={() => handleScroll(type as "year" | "month" | "day")}
                >
                  <StickyLabel>{type === "year" ? "YY" : type === "month" ? "MM" : "DD"}</StickyLabel>
                  {list.map((value) => (
                    <PickerItem
                      key={value}
                      data-value={value}
                      isSelected={value === centerItem[type as keyof typeof centerItem]}
                    >
                      {value}
                    </PickerItem>
                  ))}
                </PickerColumn>
              );
            })}
          </PickerContainer>
        </PickerWrapper>
        <SaveButton onClick={handleSave}>Save</SaveButton>
      </ModalContent>
    </Modal>
  );
}


const ModalContent = styled.div`
  border-radius: 10px;
  width: 100%;
  padding: 20px 50px;
  height: 472px;
  margin-top: 200px;
  background-color: #f5f9fc;
`;

const Title = styled.h2`
  margin-top: 14px;
  font-size: 18px;
  font-weight: 400;
  margin-left: 0;
`;

const PickerWrapper = styled.div`
  position: relative;
`;

const CenterLine = styled.div`
  position: absolute;
  top: calc(50% - 20px);
  left: 50%;
  transform: translateX(-50%);
  width: 276px;
  height: 40px;
  background-color: #F1F1F5;
  border-radius: 16px;
  border: 1px solid #000;
  pointer-events: none;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
  z-index: 0;
`;

const PickerContainer = styled.div`
  margin-top: 42px;
  display: flex;
  justify-content: center;
  height: 150px;
  width: 100%;
  overflow: hidden;
  gap: 20px;
  position: relative;
  z-index: 1;
`;

const PickerColumn = styled.div`
  width: 80px;
  height: 100%;
  margin-top: -10px;
  overflow-y: scroll;
  border-radius: 5px;
  text-align: center;
  z-index: 1;
`;

const StickyLabel = styled.p`
  font-size: 12px;
  color: rgba(0, 0, 0, 1);
  position: sticky;
  top: 10px;
  background-color: #f5f9fc;
  z-index: 10;
`;

const PickerItem = styled.div<{ isSelected: boolean }>`
  height: 40px;
  line-height: 30px;
  font-size: 16px;
  cursor: pointer;
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  color: ${(props) => (props.isSelected ? "black" : "#999")};
`;

const SaveButton = styled.button`
  margin-top: 50px;
  padding: 10px;
  font-size: 18px;
  font-weight: 400;
  background-color: #0097a7;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
`;
