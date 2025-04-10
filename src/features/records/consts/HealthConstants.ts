const diseases = [
  { name: 'diabetes,colic1', date: '2024.11.20' },
  { name: 'diabetes,colic2', date: '2024.11.21' },
  { name: 'diabetes,colic3', date: '2024.11.22' },
  { name: 'diabetes,colic4', date: '2024.11.23' },
  { name: 'diabetes,colic5', date: '2024.11.24' }
  ];

  const initialHealthFormData = [
    { title: "Disease", value: "", editable: true },
    { title: "Allergy", value: "", editable: true },
    { title: "Blood pressure", value: "", editable: true },
    { title: "Blood sugar", value: "", editable: true },
    { title: "Medicine History", value: "", editable: true },
  ];

  const healthStatusData = [
    { title: "Disease", value: "diabetes, colic1" },
    { title: "Allergy", value: "pollen, shellfish, peach" },
    { title: "Blood pressure", value: "138 / 75", unit: "mmHg" },
    { title: "Blood sugar", value: "90 / 164", unit: "mg/dL" },
    { title: "Medicine History", value: "dermatological" },
  ];

  const healthStatusDetails = [
    { title: "Diease", value: "asdfasdfasd" },
    { title: "Allergy", value: "asdfasdfasd" },
    { title: "Blood Pressure", value: "asdfasdfasd" },
  ];

  export {
    diseases,
    initialHealthFormData,
    healthStatusData,
    healthStatusDetails,
  };