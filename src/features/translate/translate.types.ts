import { ClassPostProps } from "../diagnosis/ui/Funnel";

interface IRecordingIndicatorProps {
  children: React.ReactNode;
}

interface GuideFunnelProps extends Omit<ClassPostProps, "nextClickHandler"> {
  setStep: React.Dispatch<React.SetStateAction<string>>;
  currentStep: string;
}

type Locale = "ko" | "en";
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

interface GuideAccoridoinProps {
  title: string;
  text: LocalizedText[];
}

export type {
  IRecordingIndicatorProps,
  GuideFunnelProps,
  Guide,
  GuideAccoridoinProps,
};
