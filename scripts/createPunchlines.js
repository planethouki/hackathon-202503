const admin = require("firebase-admin");

const generateRandomDate = (start, end) => {
  const randomTimestamp = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return randomTimestamp.toISOString();
};

const startDate = new Date("2025-01-01T00:00:00Z");
const endDate = new Date("2025-01-31T23:59:59Z");

const youTubeUrl = "https://www.youtube.com/embed/M0xy9bGhn4Y";


const initialPunchlines = [
  { id: "0ySrs5HVwhP1hmFw1UZl", title: "歯科のダンス", url: youTubeUrl, contestId: "a1b2c3d4e5f6g7h8i9j0", userId: "dummy1" },
  { id: "z2BcL0hqGPS2MnSsk9JP", title: "パンの探検", url: youTubeUrl, contestId: "a1b2c3d4e5f6g7h8i9j0", userId: "dummy1" },
  { id: "JvbLqobYoHMzzuPLl5n7", title: "猫の逆襲", url: youTubeUrl, contestId: "a1b2c3d4e5f6g7h8i9j0", userId: "dummy1" },
  { id: "5FSTlSGfDAr2URda2xSc", title: "迫る影！", url: youTubeUrl, contestId: "a1b2c3d4e5f6g7h8i9j0", userId: "dummy1" },
  { id: "eYc8F7LYWnGtQLg9QR7M", title: "ワンコの大失敗", url: youTubeUrl, contestId: "k1l2m3n4o5p6q7r8s9t0", userId: "dummy2" },
].map((c, i) => {
  return {
    ...c,
    createdAt: generateRandomDate(startDate, endDate),
  }
});

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const db = admin.firestore();

const writeInitialContests = async () => {
  for (const punchline of initialPunchlines) {
    try {
      const userDoc = db
        .collection("punchlines")
        .doc(punchline.id);
      await userDoc.set(punchline);
      console.log(`Contest ${punchline.title} added successfully!`);
    } catch (error) {
      console.error(`Error adding contest ${punchline.title}: `, error);
    }
  }
};

// 関数を実行
writeInitialContests();

