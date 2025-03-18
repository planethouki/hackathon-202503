const admin = require("firebase-admin");

const generateRandomDate = (startStr, endStr) => {
  const start = new Date(startStr);
  const end = new Date(endStr);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toISOString();
};

const contests = [
  {"id":"GEwZwNbb3w3uWEIMhBq5", "title":"一発ギャグ #1", "imageName":"7.ippatsugyag_400_400.png", "postStartDate":"2025-03-18T00:05:31.000Z", "postEndDate":"2025-03-20T00:05:31.000Z", "pollStartDate":"2025-03-18T01:05:31.000Z", "pollEndDate":"2025-03-20T01:05:31.000Z", "createdAt":"2025-01-01T00:05:31.000Z", "punchlineCount":"0"},
  {"id":"4Tj0SAVoD70GgTzNo6FY", "title":"ゲーム #1", "imageName":"1.game_400_400.png", "postStartDate":"2025-03-18T01:29:16.000Z", "postEndDate":"2025-03-20T01:29:16.000Z", "pollStartDate":"2025-03-18T02:29:16.000Z", "pollEndDate":"2025-03-20T02:29:16.000Z", "createdAt":"2025-01-01T01:07:34.000Z", "punchlineCount":"0"},
  {"id":"Egr9ggw8GCT6ES1xIZhN", "title":"ショートコント #1", "imageName":"5.shortconte_400_400.png", "postStartDate":"2025-03-18T02:53:01.000Z", "postEndDate":"2025-03-20T02:53:01.000Z", "pollStartDate":"2025-03-18T03:53:01.000Z", "pollEndDate":"2025-03-20T03:53:01.000Z", "createdAt":"2025-01-01T02:09:37.000Z", "punchlineCount":"0"},
  {"id":"LSWU5URpOUrru89wiNa2", "title":"ハプニング #1", "imageName":"2.happening_400_400.png", "postStartDate":"2025-03-18T04:16:46.000Z", "postEndDate":"2025-03-20T04:16:46.000Z", "pollStartDate":"2025-03-18T05:16:46.000Z", "pollEndDate":"2025-03-20T05:16:46.000Z", "createdAt":"2025-01-01T03:11:40.000Z", "punchlineCount":"0"},
  {"id":"rVywhvPT6nWJW2XHqL5t", "title":"一言ボケ #1", "imageName":"3.hitokoto_400_400.webp", "postStartDate":"2025-03-18T05:40:31.000Z", "postEndDate":"2025-03-20T05:40:31.000Z", "pollStartDate":"2025-03-18T06:40:31.000Z", "pollEndDate":"2025-03-20T06:40:31.000Z", "createdAt":"2025-01-01T04:13:43.000Z", "punchlineCount":"0"},
  {"id":"bPbvxi6XZd9Rlhf45CxK", "title":"スポーツ #1", "imageName":"8.sports_400_400.png", "postStartDate":"2025-03-18T07:04:16.000Z", "postEndDate":"2025-03-20T07:04:16.000Z", "pollStartDate":"2025-03-18T08:04:16.000Z", "pollEndDate":"2025-03-20T08:04:16.000Z", "createdAt":"2025-01-01T05:15:46.000Z", "punchlineCount":"0"},
  {"id":"EnYPo6k5UtkIQyg4pP6l", "title":"歌ネタ #1", "imageName":"6.utaneta_400_400.png", "postStartDate":"2025-03-18T08:28:01.000Z", "postEndDate":"2025-03-20T08:28:01.000Z", "pollStartDate":"2025-03-18T09:28:01.000Z", "pollEndDate":"2025-03-20T09:28:01.000Z", "createdAt":"2025-01-01T06:17:49.000Z", "punchlineCount":"0"},
  {"id":"4DAodhoXvhYBkyrKAWrw", "title":"美女 #1", "imageName":"9.bijyo.jpg", "postStartDate":"2025-03-18T09:51:46.000Z", "postEndDate":"2025-03-20T09:51:46.000Z", "pollStartDate":"2025-03-18T10:51:46.000Z", "pollEndDate":"2025-03-20T10:51:46.000Z", "createdAt":"2025-01-01T07:19:52.000Z", "punchlineCount":"0"},
  {"id":"jI1VX69mJPzxMjDHYCVx", "title":"一発ギャグ #2", "imageName":"7.ippatsugyag_400_400.png", "postStartDate":"2025-03-18T11:15:31.000Z", "postEndDate":"2025-03-20T11:15:31.000Z", "pollStartDate":"2025-03-18T12:15:31.000Z", "pollEndDate":"2025-03-20T12:15:31.000Z", "createdAt":"2025-01-01T08:21:55.000Z", "punchlineCount":"0"},
  {"id":"WxBeE3MbpAAALaWoLbw8", "title":"ゲーム #2", "imageName":"1.game_400_400.png", "postStartDate":"2025-03-18T12:39:16.000Z", "postEndDate":"2025-03-20T12:39:16.000Z", "pollStartDate":"2025-03-18T13:39:16.000Z", "pollEndDate":"2025-03-20T13:39:16.000Z", "createdAt":"2025-01-01T09:23:58.000Z", "punchlineCount":"0"},
  {"id":"4JBpj8IyBX8Z8ZAXVVLW", "title":"ショートコント #2", "imageName":"5.shortconte_400_400.png", "postStartDate":"2025-03-18T14:03:01.000Z", "postEndDate":"2025-03-20T14:03:01.000Z", "pollStartDate":"2025-03-18T15:03:01.000Z", "pollEndDate":"2025-03-20T15:03:01.000Z", "createdAt":"2025-01-01T10:26:01.000Z", "punchlineCount":"0"},
  {"id":"RaFuL6ICtqjx4ZdnMAKk", "title":"ハプニング #2", "imageName":"2.happening_400_400.png", "postStartDate":"2025-03-18T15:26:46.000Z", "postEndDate":"2025-03-20T15:26:46.000Z", "pollStartDate":"2025-03-18T16:26:46.000Z", "pollEndDate":"2025-03-20T16:26:46.000Z", "createdAt":"2025-01-01T11:28:04.000Z", "punchlineCount":"0"},
  {"id":"hl5rpYS3pxsWNuYeCcrc", "title":"一言ボケ #2", "imageName":"3.hitokoto_400_400.webp", "postStartDate":"2025-03-18T16:50:31.000Z", "postEndDate":"2025-03-20T16:50:31.000Z", "pollStartDate":"2025-03-18T17:50:31.000Z", "pollEndDate":"2025-03-20T17:50:31.000Z", "createdAt":"2025-01-01T12:30:07.000Z", "punchlineCount":"0"},
  {"id":"EHWxiTAdjbixxDk58KSJ", "title":"スポーツ #2", "imageName":"8.sports_400_400.png", "postStartDate":"2025-03-18T18:14:16.000Z", "postEndDate":"2025-03-20T18:14:16.000Z", "pollStartDate":"2025-03-18T19:14:16.000Z", "pollEndDate":"2025-03-20T19:14:16.000Z", "createdAt":"2025-01-01T13:32:10.000Z", "punchlineCount":"0"},
  {"id":"DM8XxyuQP4CNARvTjq1j", "title":"歌ネタ #2", "imageName":"6.utaneta_400_400.png", "postStartDate":"2025-03-18T19:38:01.000Z", "postEndDate":"2025-03-20T19:38:01.000Z", "pollStartDate":"2025-03-18T20:38:01.000Z", "pollEndDate":"2025-03-20T20:38:01.000Z", "createdAt":"2025-01-01T14:34:13.000Z", "punchlineCount":"0"},
  {"id":"mlJVK3FdK8cBSRvM7I1h", "title":"美女 #2", "imageName":"9.bijyo.jpg", "postStartDate":"2025-03-18T21:01:46.000Z", "postEndDate":"2025-03-20T21:01:46.000Z", "pollStartDate":"2025-03-18T22:01:46.000Z", "pollEndDate":"2025-03-20T22:01:46.000Z", "createdAt":"2025-01-01T15:36:16.000Z", "punchlineCount":"0"},
  {"id":"qw4B5oDx2leV3c9062Qi", "title":"一発ギャグ #3", "imageName":"7.ippatsugyag_400_400.png", "postStartDate":"2025-03-18T22:25:31.000Z", "postEndDate":"2025-03-20T22:25:31.000Z", "pollStartDate":"2025-03-18T23:25:31.000Z", "pollEndDate":"2025-03-20T23:25:31.000Z", "createdAt":"2025-01-01T16:38:19.000Z", "punchlineCount":"0"},
  {"id":"MnA3jWOhgcM2BcGQxIsI", "title":"ゲーム #3", "imageName":"1.game_400_400.png", "postStartDate":"2025-03-18T23:49:16.000Z", "postEndDate":"2025-03-20T23:49:16.000Z", "pollStartDate":"2025-03-19T00:49:16.000Z", "pollEndDate":"2025-03-21T00:49:16.000Z", "createdAt":"2025-01-01T17:40:22.000Z", "punchlineCount":"0"},
  {"id":"IDdT6ubdpV5AwtoqN2Rk", "title":"ショートコント #3", "imageName":"5.shortconte_400_400.png", "postStartDate":"2025-03-19T01:13:01.000Z", "postEndDate":"2025-03-21T01:13:01.000Z", "pollStartDate":"2025-03-19T02:13:01.000Z", "pollEndDate":"2025-03-21T02:13:01.000Z", "createdAt":"2025-01-01T18:42:25.000Z", "punchlineCount":"0"},
  {"id":"sriRPuHGO57UBXKioF1X", "title":"ハプニング #3", "imageName":"2.happening_400_400.png", "postStartDate":"2025-03-19T02:36:46.000Z", "postEndDate":"2025-03-21T02:36:46.000Z", "pollStartDate":"2025-03-19T03:36:46.000Z", "pollEndDate":"2025-03-21T03:36:46.000Z", "createdAt":"2025-01-01T19:44:28.000Z", "punchlineCount":"0"},
  {"id":"enpr5Q60OgjmriP4jOXA", "title":"一言ボケ #3", "imageName":"3.hitokoto_400_400.webp", "postStartDate":"2025-03-19T04:00:31.000Z", "postEndDate":"2025-03-21T04:00:31.000Z", "pollStartDate":"2025-03-19T05:00:31.000Z", "pollEndDate":"2025-03-21T05:00:31.000Z", "createdAt":"2025-01-01T20:46:31.000Z", "punchlineCount":"0"},
  {"id":"HrSsNjoOwvwZkLmdSlAg", "title":"スポーツ #3", "imageName":"8.sports_400_400.png", "postStartDate":"2025-03-19T05:24:16.000Z", "postEndDate":"2025-03-21T05:24:16.000Z", "pollStartDate":"2025-03-19T06:24:16.000Z", "pollEndDate":"2025-03-21T06:24:16.000Z", "createdAt":"2025-01-01T21:48:34.000Z", "punchlineCount":"0"},
  {"id":"ipU23jtS4KmTA8ttRkBf", "title":"歌ネタ #3", "imageName":"6.utaneta_400_400.png", "postStartDate":"2025-03-19T06:48:01.000Z", "postEndDate":"2025-03-21T06:48:01.000Z", "pollStartDate":"2025-03-19T07:48:01.000Z", "pollEndDate":"2025-03-21T07:48:01.000Z", "createdAt":"2025-01-01T22:50:37.000Z", "punchlineCount":"0"},
  {"id":"Pu2yYakRJhaqfDuYjFF4", "title":"美女 #3", "imageName":"9.bijyo.jpg", "postStartDate":"2025-03-19T08:11:46.000Z", "postEndDate":"2025-03-21T08:11:46.000Z", "pollStartDate":"2025-03-19T09:11:46.000Z", "pollEndDate":"2025-03-21T09:11:46.000Z", "createdAt":"2025-01-01T23:52:40.000Z", "punchlineCount":"0"},
  {"id":"o8Pg4ljp0HUoycHnEkBc", "title":"一発ギャグ #4", "imageName":"7.ippatsugyag_400_400.png", "postStartDate":"2025-03-19T09:35:31.000Z", "postEndDate":"2025-03-21T09:35:31.000Z", "pollStartDate":"2025-03-19T10:35:31.000Z", "pollEndDate":"2025-03-21T10:35:31.000Z", "createdAt":"2025-01-02T00:54:43.000Z", "punchlineCount":"0"},
  {"id":"R801cHUR1Vkprr2dNn5B", "title":"ゲーム #4", "imageName":"1.game_400_400.png", "postStartDate":"2025-03-19T10:59:16.000Z", "postEndDate":"2025-03-21T10:59:16.000Z", "pollStartDate":"2025-03-19T11:59:16.000Z", "pollEndDate":"2025-03-21T11:59:16.000Z", "createdAt":"2025-01-02T01:56:46.000Z", "punchlineCount":"0"},
  {"id":"UWf3N9FZ7ebVzxmolab9", "title":"ショートコント #4", "imageName":"5.shortconte_400_400.png", "postStartDate":"2025-03-19T12:23:01.000Z", "postEndDate":"2025-03-21T12:23:01.000Z", "pollStartDate":"2025-03-19T13:23:01.000Z", "pollEndDate":"2025-03-21T13:23:01.000Z", "createdAt":"2025-01-02T02:58:49.000Z", "punchlineCount":"0"},
  {"id":"vIofhWQrBMRTlAb5Wmjw", "title":"ハプニング #4", "imageName":"2.happening_400_400.png", "postStartDate":"2025-03-19T13:46:46.000Z", "postEndDate":"2025-03-21T13:46:46.000Z", "pollStartDate":"2025-03-19T14:46:46.000Z", "pollEndDate":"2025-03-21T14:46:46.000Z", "createdAt":"2025-01-02T04:00:52.000Z", "punchlineCount":"0"},
  {"id":"fOma86wK8NC1TS1Lb4Lw", "title":"一言ボケ #4", "imageName":"3.hitokoto_400_400.webp", "postStartDate":"2025-03-19T15:10:31.000Z", "postEndDate":"2025-03-21T15:10:31.000Z", "pollStartDate":"2025-03-19T16:10:31.000Z", "pollEndDate":"2025-03-21T16:10:31.000Z", "createdAt":"2025-01-02T05:02:55.000Z", "punchlineCount":"0"},
  {"id":"im2RS5fbFwWqxz43c1kh", "title":"スポーツ #4", "imageName":"8.sports_400_400.png", "postStartDate":"2025-03-19T16:34:16.000Z", "postEndDate":"2025-03-21T16:34:16.000Z", "pollStartDate":"2025-03-19T17:34:16.000Z", "pollEndDate":"2025-03-21T17:34:16.000Z", "createdAt":"2025-01-02T06:04:58.000Z", "punchlineCount":"0"},
  {"id":"dwVEVc2TDspx14PTZXbY", "title":"歌ネタ #4", "imageName":"6.utaneta_400_400.png", "postStartDate":"2025-03-19T17:58:01.000Z", "postEndDate":"2025-03-21T17:58:01.000Z", "pollStartDate":"2025-03-19T18:58:01.000Z", "pollEndDate":"2025-03-21T18:58:01.000Z", "createdAt":"2025-01-02T07:07:01.000Z", "punchlineCount":"0"},
  {"id":"nf16qDBQIMGxWi8BvPn7", "title":"美女 #4", "imageName":"9.bijyo.jpg", "postStartDate":"2025-03-19T19:21:46.000Z", "postEndDate":"2025-03-21T19:21:46.000Z", "pollStartDate":"2025-03-19T20:21:46.000Z", "pollEndDate":"2025-03-21T20:21:46.000Z", "createdAt":"2025-01-02T08:09:04.000Z", "punchlineCount":"0"},
];


const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const db = admin.firestore();

const writeContests = async () => {
  for (const contest of contests) {
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
writeContests();
