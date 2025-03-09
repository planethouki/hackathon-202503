import {onSchedule} from "firebase-functions/lib/v2/providers/scheduler";
import {logger} from "firebase-functions";

const schedule = {schedule: "0 * * * *", timeZone: "Asia/Tokyo"};
export const timerTest = onSchedule(schedule, async () => {
  logger.info("Hourly timer executed.");
});
