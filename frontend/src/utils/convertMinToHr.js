export const convertMinToHr = (min) => {
  if (typeof min !== 'number' || min < 0) return '0h 0m';

  const hours = Math.floor(min / 60);
  const minutes = min % 60;

  return `${hours}:${String(minutes).padStart(2, '0')}`;
};
