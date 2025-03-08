const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const db = admin.firestore();

const deletePolls = async () => {
  const punchlinesSnapshot = await db
    .collection("punchlines")
    .get();

  for (const punchlineDoc of punchlinesSnapshot.docs) {
    const pollsSnapshot = await db
      .collection(`punchlines/${punchlineDoc.id}/polls`)
      .get();

    for (const pollDoc of pollsSnapshot.docs) {
      try {
        await pollDoc.ref.delete();
        console.log(`Poll with ID ${pollDoc.id} deleted successfully!`);
      } catch (error) {
        console.error(`Error deleting poll with ID ${pollDoc.id}: `, error);
      }
    }
  }
};

// 関数を実行
deletePolls();
