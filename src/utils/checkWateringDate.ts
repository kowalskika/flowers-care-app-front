export function checkWateringDate(nextWateringAt: string) {
  const today = new Date().toLocaleDateString('fr-CH');
  if (
    nextWateringAt
    && Number(nextWateringAt.slice(0, 2)) <= Number(today.slice(0, 2))
    && Number(nextWateringAt.slice(3, 5)) <= Number(today.slice(3, 5))
    && Number(nextWateringAt.slice(6)) <= Number(today.slice(6))
  ) {
    return 'red';
  }
  return 'black';
}
