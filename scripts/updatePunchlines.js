const admin = require("firebase-admin");
const ethers = require("ethers");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const db = admin.firestore();

const exec = async () => {
  const punchlineSnapshots = await db
    .collection("punchlines")
    .get();

  for (let doc of punchlineSnapshots.docs) {
    const punchline = doc.data();
    const tokenId = ethers.id(punchline.id).slice(0, 10);
    const tokenIdDec = parseInt(tokenId, 16);

    await db
      .collection("punchlines")
      .doc(doc.id)
      .update({
        tokenId,
        tokenIdDec,
      });

    console.log(`Updated doc (${doc.id}) with tokenId: ${tokenId}`);
  }
};

// 関数を実行
exec();

