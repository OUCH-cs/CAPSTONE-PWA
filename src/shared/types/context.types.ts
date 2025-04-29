interface IAccordionContext {
  isOpen: boolean;
  toggleAccordion: () => void;
  parentRef: React.RefObject<HTMLDivElement | null>;
  childRef: React.RefObject<HTMLDivElement | null>;
}

export type { IAccordionContext };
