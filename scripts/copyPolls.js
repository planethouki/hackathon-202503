const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const db = admin.firestore();

const copyPolls = async () => {
  const punchlinesSnapshot = await db
    .collection("punchlines")
    .get();

  for (const punchlineDoc of punchlinesSnapshot.docs) {
    const pollsSnapshot = await db
      .collection(`punchlines/${punchlineDoc.id}/polls`)
      .get();

    for (const pollDoc of pollsSnapshot.docs) {
      try {
        await db.collection("polls").doc(pollDoc.id).set({
          punchlineId: punchlineDoc.id,
          ...pollDoc.data(),
        });
        console.log(`Poll with ID ${pollDoc.id} moved successfully!`);
      } catch (error) {
        console.error(`Error moving poll with ID ${pollDoc.id}: `, error);
      }
    }
  }
};

// 関数を実行
copyPolls();
