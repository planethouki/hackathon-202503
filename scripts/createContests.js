const admin = require("firebase-admin");

const generateRandomDate = (startStr, endStr) => {
  const start = new Date(startStr);
  const end = new Date(endStr);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toISOString();
};

const initialContests = [
  {
    id: "a1b2c3d4e5f6g7h8i9j0",
    title: "よく柿食う客は？",
    imageUrl: "https://picsum.photos/seed/101/400/400",
    postStartDate: "2025-01-14T09:02:16.458Z",
    postEndDate: "2025-04-08T01:22:43.035Z",
    pollStartDate: "2025-01-14T09:02:16.458Z",
    pollEndDate: "2025-04-08T01:22:43.035Z",
    createdAt: "2024-12-08T15:05:48.853Z",
    punchlineCount: 0,
  },
  {
    id: "k1l2m3n4o5p6q7r8s9t0",
    title: "ふとんはどこへふっとんだ？",
    imageUrl: "https://picsum.photos/seed/102/400/400",
    postStartDate: "2025-01-02T16:53:00.544Z",
    postEndDate: "2025-02-21T10:28:12.486Z",
    pollStartDate: "2025-01-02T16:53:00.544Z",
    pollEndDate: "2025-02-21T10:28:12.486Z",
    createdAt: "2024-12-12T17:28:39.658Z",
    punchlineCount: 0,
  },
  {
    id: "u1v2w3x4y5z6a7b8c9d0",
    title: "さるも木から落ちた話",
    imageUrl: "https://picsum.photos/seed/103/400/400",
    postStartDate: "2025-03-24T03:32:48.955Z",
    postEndDate: "2025-05-20T17:15:13.855Z",
    pollStartDate: "2025-03-24T03:32:48.955Z",
    pollEndDate: "2025-05-20T17:15:13.855Z",
    createdAt: "2024-12-12T18:44:46.574Z",
    punchlineCount: 0,
  },
  {
    id: "e1f2g3h4i5j6k7l8m9n0",
    title: "空飛ぶタコ",
    imageUrl: "https://picsum.photos/seed/104/400/400",
    postStartDate: "2025-02-21T11:17:37.180Z",
    postEndDate: "2025-05-19T04:15:27.105Z",
    pollStartDate: "2025-02-21T11:17:37.180Z",
    pollEndDate: "2025-05-19T04:15:27.105Z",
    createdAt: "2024-12-05T21:39:27.305Z",
    punchlineCount: 0,
  },
  {
    id: "o1p2q3r4s5t6u7v8w9x0",
    title: "最後のどんぐり",
    imageUrl: "https://picsum.photos/seed/105/400/400",
    postStartDate: "2025-02-22T19:23:00.243Z",
    postEndDate: "2025-05-30T19:18:08.986Z",
    pollStartDate: "2025-02-22T19:23:00.243Z",
    pollEndDate: "2025-05-30T19:18:08.986Z",
    createdAt: "2024-12-23T12:00:08.222Z",
    punchlineCount: 0,
  },
  {
    id: "y1z2a3b4c5d6e7f8g9h0",
    title: "冬眠しすぎたクマ",
    imageUrl: "https://picsum.photos/seed/106/400/400",
    postStartDate: "2025-01-29T14:40:00.612Z",
    postEndDate: "2025-02-09T09:00:28.603Z",
    pollStartDate: "2025-01-29T14:40:00.612Z",
    pollEndDate: "2025-02-09T09:00:28.603Z",
    createdAt: "2024-12-13T10:18:45.631Z",
    punchlineCount: 0,
  },
  {
    id: "i1j2k3l4m5n6o7p8q9r0",
    title: "ロボットのピクニック",
    imageUrl: "https://picsum.photos/seed/107/400/400",
    postStartDate: "2025-01-27T06:43:46.257Z",
    postEndDate: "2025-03-19T07:19:42.726Z",
    pollStartDate: "2025-01-27T06:43:46.257Z",
    pollEndDate: "2025-03-19T07:19:42.726Z",
    createdAt: "2024-12-27T15:28:34.712Z",
    punchlineCount: 0,
  },
  {
    id: "s1t2u3v4w5x6y7z8a9b0",
    title: "世界一バランスの悪い象",
    imageUrl: "https://picsum.photos/seed/108/400/400",
    postStartDate: "2025-03-16T07:24:37.556Z",
    postEndDate: "2025-03-22T17:55:28.153Z",
    pollStartDate: "2025-03-16T07:24:37.556Z",
    pollEndDate: "2025-03-22T17:55:28.153Z",
    createdAt: "2024-12-15T03:58:09.610Z",
    punchlineCount: 0,
  },
];


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
