require('dotenv').config();
const admin = require("firebase-admin");
const ethers = require("ethers");
const generateRandomString = require("./generateRandomString");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const mintAbi =
[
  {
    "type": "function",
    "name": "mint",
    "inputs": [
      {
        "name": "to",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "tokenId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
]

const mintPunchlineToken = async () => {

  const punchlineSnapshots = await db
    .collection("punchlines")
    .get();

  if (punchlineSnapshots.empty) {
    console.log("No transactions found.");
    return;
  }

  for (let snapshot of punchlineSnapshots.docs) {
    const punchline = snapshot.data();

    const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
    const wallet = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, provider);
    const contract = new ethers.Contract(
      process.env.ETH_PUNCHLINE_TOKEN_ADDRESS,
      mintAbi,
      wallet
    );
    const tokenId = ethers.id(punchline.id).slice(0, 10);
    console.log(punchline.id, tokenId);
    const transactionResponse = await contract.mint(
      wallet.address,
      tokenId,
    );

    await transactionResponse.wait();

    const txId = generateRandomString();
    await db.collection("transactions").doc(txId).set({
      id: txId,
      userId: "admin",
      punchlineId: punchline.id,
      hash: transactionResponse.hash,
      from: transactionResponse.from,
      to: transactionResponse.to,
      type: "mintPunchlineToken",
      tokenId,
      createdAt: new Date().toISOString(),
    });
  }

};

mintPunchlineToken();
