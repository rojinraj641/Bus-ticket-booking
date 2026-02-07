const TIME_RANGES = {
  "Before 6am": { start: 0, end: 360 },
  "6am to 12pm": { start: 360, end: 720 },
  "12pm to 6pm": { start: 720, end: 1080 },
  "After 6pm": { start: 1080, end: 1439 }
};

export function buildTimeMatch(field, selectedRanges) {
  console.log('Inside buildTimeMatch')
  if (!selectedRanges?.length) return null;

  const orConditions = selectedRanges.map(label => {
    console.log('Inside orConditions')
    const range = TIME_RANGES[label];
    if (!range) return null;

    return {
      [field]: {
        $gte: range.start,
        $lte: range.end
      }
    };
  }).filter(Boolean);

  return orConditions.length ? { $or: orConditions } : null;
}
