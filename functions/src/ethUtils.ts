import {defineSecret, defineString} from "firebase-functions/params";
import {ethers, keccak256, id} from "ethers";
import {erc20Abi, punchlineTokenAbi, contestTokenAbi} from "./abi";

const privateKey = defineSecret("ETH_PRIVATE_KEY");
const rpcUrl = defineString("ETH_RPC_URL");
const erc20Address = defineString("ETH_ERC20_ADDRESS");
const punchlineTokenAddress = defineString("ETH_PUNCHLINE_TOKEN_ADDRESS");
const contestTokenAddress = defineString("ETH_CONTEST_TOKEN_ADDRESS");

interface MintPollTokenResult {
  from: string;
  hash: string;
  to: string;
  recipient: string;
}

export const mintPollToken = async (
  recipientAddress: string
): Promise<MintPollTokenResult> => {
  const provider = new ethers.JsonRpcProvider(rpcUrl.value());
  const wallet = new ethers.Wallet(privateKey.value(), provider);
  const contract = new ethers.Contract(
    erc20Address.value(),
    erc20Abi,
    wallet
  );
  const transactionResponse = await contract.poll(
    recipientAddress,
  );

  await transactionResponse.wait();

  return {
    ...transactionResponse,
    recipient: recipientAddress,
  } as MintPollTokenResult;
};

interface MintPunchlineTokenResult {
  from: string;
  hash: string;
  to: string;
  tokenId: string;
  tokenIdDec: number;
}

export const mintPunchlineToken = async (
  punchlineId: string
): Promise<MintPunchlineTokenResult> => {
  const provider = new ethers.JsonRpcProvider(rpcUrl.value());
  const wallet = new ethers.Wallet(privateKey.value(), provider);
  const contract = new ethers.Contract(
    punchlineTokenAddress.value(),
    punchlineTokenAbi,
    wallet
  );
  const tokenId = id(punchlineId).slice(0, 10);
  const tokenIdDec = BigInt(tokenId).toString();
  const transactionResponse = await contract.mint(
    wallet.address,
    tokenId,
  );

  await transactionResponse.wait();

  return {
    ...transactionResponse,
    tokenId,
    tokenIdDec,
  } as MintPunchlineTokenResult;
};

interface SendPunchlineTokenResult {
  from: string;
  hash: string;
  to: string;
  tokenFrom: string;
  tokenTo: string;
}

export const sendPunchlineToken = async (
  punchlineId: string,
  to: string,
): Promise<SendPunchlineTokenResult> => {
  const provider = new ethers.JsonRpcProvider(rpcUrl.value());
  const wallet = new ethers.Wallet(privateKey.value(), provider);
  const contract = new ethers.Contract(
    punchlineTokenAddress.value(),
    punchlineTokenAbi,
    wallet
  );
  const tokenId = id(punchlineId).slice(0, 10);
  const transactionResponse = await contract.safeTransferFrom(
    wallet.address,
    to,
    tokenId,
  );

  await transactionResponse.wait();

  return {
    ...transactionResponse,
    tokenFrom: wallet.address,
    tokenTo: to,
  } as SendPunchlineTokenResult;
};

interface MintContestTokenResult {
  from: string;
  hash: string;
  to: string;
  recipient: string;
  tokenId: string;
}

export const mintContestToken = async (
  contestId: string,
  punchlineId: string,
  recipient: string,
): Promise<MintContestTokenResult> => {
  const provider = new ethers.JsonRpcProvider(rpcUrl.value());
  const wallet = new ethers.Wallet(privateKey.value(), provider);
  const contract = new ethers.Contract(
    contestTokenAddress.value(),
    contestTokenAbi,
    wallet
  );
  const tokenId = id(contestId + punchlineId).toString();
  const transactionResponse = await contract.mint(
    recipient,
    tokenId,
  );

  await transactionResponse.wait();

  return {
    ...transactionResponse,
    recipient,
    tokenId,
  } as MintContestTokenResult;
};

export const calcWallet = (id: string): ethers.Wallet => {
  const idHash = ethers.id(id);
  const contractHash = keccak256(erc20Address.value());
  const privateKeyHash = keccak256(privateKey.value());
  const concatenatedHash =
    idHash + contractHash.slice(2) + privateKeyHash.slice(2);
  const finalHash = keccak256(concatenatedHash);
  const provider = new ethers.JsonRpcProvider(rpcUrl.value());
  return new ethers.Wallet(finalHash, provider);
};

export const calcAddress = (id: string) => {
  return calcWallet(id).address;
};
