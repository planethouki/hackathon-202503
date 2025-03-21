import {onCall, HttpsError} from "firebase-functions/v2/https";
import {getFirestore} from "firebase-admin/firestore";
import {defineSecret, defineString} from "firebase-functions/params";
import {logger} from "firebase-functions";
import {ethers} from "ethers";
import {erc20Abi} from "../abi";
import {calcWallet, sendPunchlineToken} from "../ethUtils";
import {generateRandomString} from "../utils";

const db = getFirestore();
const privateKey = defineSecret("ETH_PRIVATE_KEY");
const rpcUrl = defineString("ETH_RPC_URL");
const erc20Address = defineString("ETH_ERC20_ADDRESS");

interface PollTokenWithdrawRequest {
  punchlineId: string;
  walletAddress: string;
}

export const getPollTokenWithdrawSignature = onCall<PollTokenWithdrawRequest>({
  cors: true,
  secrets: [privateKey],
}, async (request) => {
  const {punchlineId, walletAddress: spender} = request.data;
  const uid = request.auth?.uid;

  if (uid === undefined) {
    throw new HttpsError("permission-denied", "ログインが必要です");
  }

  const pRef = db.doc(`punchlines/${punchlineId}`);
  const pSnap = await pRef.get();

  if (!pSnap.exists) {
    throw new HttpsError("not-found", "対象の投稿が見つかりません");
  }

  const punchlineData = pSnap.data();

  if (punchlineData?.userId !== uid) {
    throw new HttpsError("permission-denied", "自分の投稿のみトークンを引き出せます");
  }

  const contestRef = db.doc(`contests/${punchlineData.contestId}`);
  const contestSnap = await contestRef.get();

  if (!contestSnap.exists) {
    throw new HttpsError("not-found", "対象のお題が見つかりません");
  }

  const contestData = contestSnap.data();
  const pollEndDate = new Date(contestData?.pollEndDate);
  const now = new Date();

  if (now < pollEndDate) {
    throw new HttpsError("failed-precondition", "投票期間が終了していません");
  }

  // ERC2612のpermit署名を作成
  const provider = new ethers.JsonRpcProvider(rpcUrl.value());
  const wallet = calcWallet(punchlineId);
  const contract = new ethers.Contract(
    erc20Address.value(),
    erc20Abi,
    wallet
  );


  const balance = await contract.balanceOf(wallet.address);

  if (balance <= 0) {
    throw new HttpsError("failed-precondition", "引き出せるトークンがありません");
  }

  const deadline = Math.floor(Date.now() / 1000) + 60 * 60;

  const domain = {
    name: await contract.name(),
    version: "1",
    chainId: (await provider.getNetwork()).chainId,
    verifyingContract: erc20Address.value(),
  };

  const types = {
    Permit: [
      {name: "owner", type: "address"},
      {name: "spender", type: "address"},
      {name: "value", type: "uint256"},
      {name: "nonce", type: "uint256"},
      {name: "deadline", type: "uint256"},
    ],
  };

  const nonce = await contract.nonces(wallet.address);

  const signData = {
    owner: wallet.address,
    spender,
    value: balance,
    nonce,
    deadline,
  };

  const signature = await wallet.signTypedData(domain, types, signData);
  const sig = ethers.Signature.from(signature);

  logger.info(`Created withdraw signature for punchline ${punchlineId}`);

  return {
    success: true,
    message: "署名を作成しました",
    signature: {
      v: sig.v,
      r: sig.r,
      s: sig.s,
      deadline: deadline,
      value: balance.toString(),
    },
  };
});

interface PunchlineTokenWithdrawRequest {
  punchlineId: string;
  walletAddress: string;
}

export const withdrawPunchlineToken = onCall<PunchlineTokenWithdrawRequest>({
  cors: true,
  secrets: [privateKey],
}, async (request) => {
  const {punchlineId, walletAddress: recipient} = request.data;
  const uid = request.auth?.uid;

  if (uid === undefined) {
    throw new HttpsError("permission-denied", "ログインが必要です");
  }

  const pRef = db.doc(`punchlines/${punchlineId}`);
  const pSnap = await pRef.get();

  if (!pSnap.exists) {
    throw new HttpsError("not-found", "対象の投稿が見つかりません");
  }

  const punchlineData = pSnap.data();

  if (punchlineData?.userId !== uid) {
    throw new HttpsError("permission-denied", "自分の投稿のトークンのみ引き出せます");
  }

  const result = await sendPunchlineToken(punchlineId, recipient);

  const txId = generateRandomString();
  await db.collection("transactions").doc(txId).set({
    id: txId,
    userId: uid,
    punchlineId,
    hash: result.hash,
    from: result.from,
    to: result.to,
    tokenId: result.tokenId,
    tokenIdDec: result.tokenIdDec,
    type: "sendPunchlineToken",
    recipient,
    createdAt: new Date().toISOString(),
  });

  return {
    success: true,
    hash: result.hash,
  };
});
