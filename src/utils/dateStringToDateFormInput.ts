export const dateStringToFormDateInput = (dateString: string): string => {
  const date = dateString.split('.');
  return `${date[2]}-${date[1]}-${date[0]}`;
};
