export function convertHoursToHrMin(decimalHours) {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);

  return `${hours}h ${minutes.toString().padStart(2, '0')}min`;
}
