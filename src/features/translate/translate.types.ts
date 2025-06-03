import { ClassPostProps } from "../diagnosis/ui/Funnel";

interface GuideFunnelProps extends Omit<ClassPostProps, "nextClickHandler"> {
  setStep: React.Dispatch<React.SetStateAction<string>>;
  currentStep: string;
  funnelModalToggle: () => void;
}

type Locale = "ko" | "en" | "zh";
type LocalizedText = Record<Locale, string>;

interface Guide {
  step: number;
  title: LocalizedText;
  icon: string;
  purpose: LocalizedText;
  whatToExpect: LocalizedText[];
  keyPhrases: LocalizedText[];
  actionGuide: LocalizedText[];
  possibleQuestions: LocalizedText[] | null;
  tips: LocalizedText[];
}

interface GuideAccordionProps {
  title: string;
  text: LocalizedText[];
}

interface ChatMessage {
  id: string;
  speaker: "doctor" | "user";
  original: string;
  translation: string;
}

export type {
  GuideFunnelProps,
  Locale,
  LocalizedText,
  Guide,
  GuideAccordionProps,
  ChatMessage,
};
