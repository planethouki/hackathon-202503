require('dotenv').config();
const admin = require("firebase-admin");
const ethers = require("ethers");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const mintAbi =
  [
    {
      "type": "function",
      "name": "poll",
      "inputs": [
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "renounceOwnership",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    }
  ]

const mintPollToken = async () => {

  const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
  const wallet = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, provider);
  const contract = new ethers.Contract(
    process.env.ETH_POLL_TOKEN_ADDRESS,
    mintAbi,
    wallet
  );
  const transactionResponse = await contract.poll(
    wallet.address,
  );

  await transactionResponse.wait();

};

mintPollToken();
