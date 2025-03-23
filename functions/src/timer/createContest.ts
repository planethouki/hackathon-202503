import {onSchedule} from "firebase-functions/v2/scheduler";
import {logger} from "firebase-functions";
import {getFirestore} from "firebase-admin/firestore";
import {generateRandomString, getWeekNumberFromJan1} from "../utils";

const db = getFirestore();

const schedule = {schedule: "0 6 * * *", timeZone: "Asia/Tokyo"};

const contestDataList = [
  {title: "一発ギャグ", image: "7.ippatsugyag_400_400.png"},
  {title: "ゲーム", image: "1.game_400_400.png"},
  {title: "ショートコント", image: "5.shortconte_400_400.png"},
  {title: "ハプニング", image: "2.happening_400_400.png"},
  {title: "一言ボケ", image: "3.hitokoto_400_400.webp"},
  {title: "スポーツ", image: "8.sports_400_400.png"},
  {title: "歌ネタ", image: "6.utaneta_400_400.png"},
];

export const createContest = onSchedule(schedule, async () => {
  const docId = generateRandomString();
  const current = new Date();
  const postStartDate = new Date();
  postStartDate.setDate(current.getDate() + 1);
  const postEndDate = new Date();
  postEndDate.setDate(current.getDate() + 7);
  const pollStartDate = new Date();
  pollStartDate.setDate(current.getDate() + 2);
  const pollEndDate = new Date();
  pollEndDate.setDate(current.getDate() + 8);

  const weekNumber = getWeekNumberFromJan1(current);
  const titleHash = `#${weekNumber + 1}`;
  const contestData = contestDataList[current.getDay()];

  const data = {
    id: docId,
    title: `${contestData.title} ${titleHash}`,
    imageName: contestData.image,
    postStartDate,
    postEndDate,
    pollStartDate,
    pollEndDate,
    createdAt: current.toISOString(),
    punchlineCount: 0,
  };

  await db
    .collection("contests")
    .doc(docId)
    .set(data);

  logger.info("Daily contest creation executed.");
});
