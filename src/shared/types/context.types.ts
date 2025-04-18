interface IAccordionContext {
  isOpen: boolean;
  toggleAccordion: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  parentRef: React.RefObject<HTMLDivElement | null>;
  childRef: React.RefObject<HTMLDivElement | null>;
}

export type { IAccordionContext };
