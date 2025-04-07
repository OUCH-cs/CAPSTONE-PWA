export const hospitals = [
    { id: "1", name: "Hanyang Hospital", rating: 4.3, distance: "768m", openStatus: "Open / Closed every Wednesday" },
    { id: "2", name: "Hanyang Hospital", rating: 4.3, distance: "768m", openStatus: "Open / Closed every Wednesday" },
    { id: "3", name: "Hanyang Hospital", rating: 4.3, distance: "768m", openStatus: "Open / Closed every Wednesday" },
    { id: "4", name: "Hanyang Hospital", rating: 4.3, distance: "768m", openStatus: "Open / Closed every Wednesday" },
  ];

export const FAQ_DATA = [
    {
      id: "1",
      question: "What is a Self-diagnosis form?",
      answer: "A simple way to record your symptoms and health concerns in advance, making it easier to communicate with your doctor or pharmacist ",
    },
    {
      id: "2",
      question: "How it works?",
      answer: `1. Choose your destination\n\n2. Select your symptoms\n\n3. Indicate how long you've had these symptoms\n\n4. Rate the severity of your discomfort\n\n5. Add any additional concerns you'd like to share with the healthcare provider`,
    },
    {
      id: "3",
      question: "Benefits",
      answer: `Reduce communication barriers with your healthcare provider\n\nSave time during your visit\n\nEnsure important symptoms aren’t missed\n\nGet more accurate medical recommendations`,
    },
  ];

  export const SYMPTOMS = ['Sore throat', 'Chills', 'Runny nose', 'Cough','감기','기침','감기 몸살'];


  export const DURATION_OPTIONS = [
    "LESS_THAN_DAY",
    "ONE_TO_THREE_DAYS",
    "MORE_THAN_THREE_DAYS",
    "MORE_THAN_WEEK",
    "MORE_THAN_MONTH",
  ];

  export const DURATION_LABELS: Record<string, string> = {
    LESS_THAN_DAY: "Less than a day",
    ONE_TO_THREE_DAYS: "1-3 days",
    MORE_THAN_THREE_DAYS: "More than 3 days",
    MORE_THAN_WEEK: "More than a week",
    MORE_THAN_MONTH: "More than a month",
  };
  
  export const ITEMS_PER_ROW = 5;