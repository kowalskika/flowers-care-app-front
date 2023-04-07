import { dateStringToFormDateInput } from './dateStringToDateFormInput';

export function checkWateringDate(nextWateringAt: string) {
  const today = new Date();
  const nextWateringAtDate = new Date(dateStringToFormDateInput(nextWateringAt));
  if (nextWateringAtDate <= today) {
    return '#ff6868';
  }
  return 'white';
}
