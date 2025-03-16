export const checkDateStatus = (start: string, end: string): "before" | "now" | "after" => {
  const now = Date.now();
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  if (now < startTime) {
    return "before";
  } else if (endTime < now) {
    return "after";
  }
  return "now";
}
