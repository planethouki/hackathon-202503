const admin = require("firebase-admin");

const generateRandomDate = (startStr, endStr) => {
  const start = new Date(startStr);
  const end = new Date(endStr);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toISOString();
};

const initialContests = [
  { id: "a1b2c3d4e5f6g7h8i9j0", title: "よく柿食う客は？", imageUrl: "https://picsum.photos/seed/101/400/400" },
  { id: "k1l2m3n4o5p6q7r8s9t0", title: "ふとんはどこへふっとんだ？", imageUrl: "https://picsum.photos/seed/102/400/400" },
  { id: "u1v2w3x4y5z6a7b8c9d0", title: "さるも木から落ちた話", imageUrl: "https://picsum.photos/seed/103/400/400" },
  { id: "e1f2g3h4i5j6k7l8m9n0", title: "空飛ぶタコ", imageUrl: "https://picsum.photos/seed/104/400/400" },
  { id: "o1p2q3r4s5t6u7v8w9x0", title: "最後のどんぐり", imageUrl: "https://picsum.photos/seed/105/400/400" },
  { id: "y1z2a3b4c5d6e7f8g9h0", title: "冬眠しすぎたクマ", imageUrl: "https://picsum.photos/seed/106/400/400" },
  { id: "i1j2k3l4m5n6o7p8q9r0", title: "ロボットのピクニック", imageUrl: "https://picsum.photos/seed/107/400/400" },
  { id: "s1t2u3v4w5x6y7z8a9b0", title: "世界一バランスの悪い象", imageUrl: "https://picsum.photos/seed/108/400/400" },
].map((c) => {
  return {
    createdAt: generateRandomDate("2024-12-01T00:00:00Z", "2024-12-31T23:59:59Z"),
    pollStartDate: generateRandomDate("2025-01-01T00:00:00Z", "2025-03-31T23:59:59Z"),
    pollEndDate: generateRandomDate("2025-02-01T00:00:00Z", "2025-05-31T23:59:59Z"),
    ...c
  }
});


const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const db = admin.firestore();

const writeInitialContests = async () => {
  for (const contest of initialContests) {
    try {
      const userDoc = db
        .collection("contests")
        .doc(contest.id);
      await userDoc.set(contest);
      console.log(`Contest ${contest.title} added successfully!`);
    } catch (error) {
      console.error(`Error adding contest ${contest.title}: `, error);
    }
  }
};

// 関数を実行
writeInitialContests();
