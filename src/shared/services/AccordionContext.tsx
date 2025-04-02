import { createContext } from "react";
import useAccordionToggle from "../lib/useAccordionToggle";
import { IAccrodionContext } from "../types";

const AccordionContext = createContext<IAccrodionContext | undefined>(
  undefined
);

function AccordionProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, toggleAccrodion, parentRef, childRef } = useAccordionToggle();

  return (
    <AccordionContext.Provider
      value={{ isOpen, toggleAccrodion, parentRef, childRef }}
    >
      {children}
    </AccordionContext.Provider>
  );
}

export { AccordionContext, AccordionProvider };
