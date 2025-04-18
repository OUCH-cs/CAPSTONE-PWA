import { AccordionContext } from "@/app/providers";
import { useContext } from "react";

const useAccordionContext = () => {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error(
      "useAccordionContext must be used within a AccordionProvider"
    );
  }
  return context;
};

export { useAccordionContext };
