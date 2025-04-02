import { createContext } from "react";
import useAccordionToggle from "../lib/useAccordionToggle";
import { IAccordionContext } from "../types";

const AccordionContext = createContext<IAccordionContext | undefined>(
  undefined
);

function AccordionProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, toggleAccordion, parentRef, childRef } = useAccordionToggle();

  return (
    <AccordionContext.Provider
      value={{ isOpen, toggleAccordion, parentRef, childRef }}
    >
      {children}
    </AccordionContext.Provider>
  );
}

export { AccordionContext, AccordionProvider };
