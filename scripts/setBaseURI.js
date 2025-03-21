require('dotenv').config();
const admin = require("firebase-admin");
const ethers = require("ethers");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const abi =
[
  {
    "type": "function",
    "name": "setBaseURI",
    "inputs": [
      {
        "name": "newBaseURI",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getBaseURI",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "tokenURI",
    "inputs": [
      {
        "name": "tokenId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
]

const exec = async () => {


  const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
  const wallet = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, provider);
  const contract = new ethers.Contract(
    process.env.ETH_PUNCHLINE_TOKEN_ADDRESS,
    abi,
    wallet
  );
  const tokenId = "";
  const transactionResponse = await contract.setBaseURI("");
  // const transactionResponse = await contract.getBaseURI();
  // const transactionResponse = await contract.tokenURI(tokenId);

  await transactionResponse.wait();

  console.log(transactionResponse);
};

exec();
