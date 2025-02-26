const admin = require("firebase-admin");


const initialUsers = [
  { id: "dummy1", authenticationId: null, displayName: "ジョン", bio: "音楽と旅行が大好きなエンジニア。", photoURL: null, createdAt: "2025-01-05T14:23:10Z" },
  { id: "dummy2", authenticationId: null, displayName: "マリア", bio: "本が大好きなイラストレーター。", photoURL: null, createdAt: "2025-01-12T08:15:45Z" },
  { id: "dummy3", authenticationId: null, displayName: "タカシ", bio: "プログラミングと写真撮影が趣味です。", photoURL: null, createdAt: "2025-01-20T16:42:30Z" },
  { id: "dummy4", authenticationId: null, displayName: "アイ", bio: "カフェ巡りと絵を描くのが好きです。", photoURL: null, createdAt: "2025-01-07T09:50:12Z" },
  { id: "dummy5", authenticationId: null, displayName: "クリス", bio: "アウトドア派で山登りが趣味です。", photoURL: null, createdAt: "2025-01-15T13:08:56Z" },
  { id: "dummy6", authenticationId: null, displayName: "ミカ", bio: "映画鑑賞と料理を楽しんでいます。", photoURL: null, createdAt: "2025-01-28T19:20:40Z" },
  { id: "dummy7", authenticationId: null, displayName: "ユウタ", bio: "スポーツ好きの大学生。", photoURL: null, createdAt: "2025-01-22T06:33:25Z" },
  { id: "dummy8", authenticationId: null, displayName: "エマ", bio: "猫と一緒にのんびり過ごすのが好きです。", photoURL: null, createdAt: "2025-01-10T22:18:34Z" }
];

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const db = admin.firestore();

const writeInitialUsers = async () => {
  for (const user of initialUsers) {
    try {
      const userDoc = db.collection("users").doc(user.id);
      await userDoc.set(user);
      console.log(`User ${user.displayName} added successfully!`);
    } catch (error) {
      console.error(`Error adding user ${user.displayName}: `, error);
    }
  }
};

// 関数を実行
writeInitialUsers();
