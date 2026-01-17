export default function addTime(startTime, duration) {
  // Parse start time (HH:MM)
  const [startHour, startMin] = startTime.split(':').map(Number);

  // Parse duration (e.g., "1h 30min")
  const hourMatch = duration.match(/(\d+)h/);
  const minMatch = duration.match(/(\d+)min/);
  const durHours = hourMatch ? parseInt(hourMatch[1]) : 0;
  const durMinutes = minMatch ? parseInt(minMatch[1]) : 0;

  // Add them
  let totalMinutes = startMin + durMinutes;
  let totalHours = startHour + durHours + Math.floor(totalMinutes / 60);
  totalMinutes = totalMinutes % 60;
  totalHours = totalHours % 24; // Wrap around if > 24h

  return `${totalHours.toString().padStart(2, '0')}:${totalMinutes.toString().padStart(2, '0')}`;
}
