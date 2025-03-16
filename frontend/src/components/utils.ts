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

export const sampleMovies = [
  {
    url: "https://www.youtube.com/shorts/aRBx4_wi_L4",
    title: "猫の動画１",
  },
  {
    url: "https://www.youtube.com/shorts/oVNT6qi-JOw",
    title: "猫の動画２",
  },
  {
    url: "https://www.youtube.com/shorts/2Ijdgmlgs6o",
    title: "スケートの動画",
  },
  {
    url: "https://www.youtube.com/shorts/vld_UoI7rxg",
    title: "猫とバナナの動画",
  },
  {
    url: "https://www.youtube.com/shorts/Otk1El6IA64",
    title: "シマエナガの動画",
  },
]

