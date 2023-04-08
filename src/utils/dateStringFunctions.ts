export const dateStringToFormDateInput = (dateString: string): string => {
  const date = dateString.split('.');
  return `${date[2]}-${date[1]}-${date[0]}`;
};

export const checkWateringDateAndSetFontColor = (nextWateringAt: string): string => {
  const today = new Date();
  const nextWateringAtDate = new Date(dateStringToFormDateInput(nextWateringAt));
  if (nextWateringAtDate <= today) {
    return '#ff6868';
  }
  return 'white';
};

export const addDays = (date: Date, days: number): Date => {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
};
