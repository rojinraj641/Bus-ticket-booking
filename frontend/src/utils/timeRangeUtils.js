const TIME_RANGES = {
  "Before 6am": { start: 0, end: 6 },
  "6am to 12pm": { start: 6, end: 12 },
  "12pm to 6pm": { start: 12, end: 18 },
  "After 6pm": { start: 18, end: 24 },
};

const getTimeRange = (label) => TIME_RANGES[label] || null;

const formatTimeRange = (range) => {
  if (!range) return null;
  return `${TIME_RANGES[range].start}-${TIME_RANGES[range].end}`;
};

export { getTimeRange, formatTimeRange, TIME_RANGES };
export default getTimeRange;
