export interface GuideQnA {
  category: {
    [langCode: string]: string;
  };
  question: {
    [langCode: string]: string;
  };
  answer: {
    [langCode: string]: string;
  };
}