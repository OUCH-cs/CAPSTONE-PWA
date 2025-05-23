export const formatMeasurement = (value: number | null | undefined): string => {
  if (!value) return " / ";
  const first = Math.floor(value / 1000);
  const second = value % 1000;
  return `${first} / ${second}`;
};
