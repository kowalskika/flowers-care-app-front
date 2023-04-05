import { dateStringToFormDateInput } from './dateStringToDateFormInput';

export function checkWateringDate(nextWateringAt: string) {
  const today = new Date();
  const nextWateringAtDate = new Date(dateStringToFormDateInput(nextWateringAt));
  if (nextWateringAtDate <= today) {
    return 'red';
  }
  return 'black';
}
