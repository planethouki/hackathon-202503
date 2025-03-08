const admin = require("firebase-admin");

function generateRandomString() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 20;
  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const db = admin.firestore();

const writeInitialPolls = async () => {
  const punchlinesSnapshot = await db
    .collection("punchlines")
    .get();

  for (const punchlineDoc of punchlinesSnapshot.docs) {
    try {

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
      for (let i = 1; i <= 4; i++) {
        const id = generateRandomString();
        const pollDocRef = db
          .collection(`punchlines/${punchlineDoc.id}/polls`)
          .doc(id);
        await pollDocRef.set({
          userId: "dummy1",
          createdAt: new Date().toISOString(),
          emoji: i.toString(),
          id,
        });
      }
      console.log(`Punchline Poll added successfully!`);
    } catch (error) {
      console.error(`Error adding punchline Poll: `, error);
    }
  }
};

// 関数を実行
writeInitialPolls();
