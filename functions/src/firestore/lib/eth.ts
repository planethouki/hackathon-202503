import {defineSecret} from "firebase-functions/params";
import {ethers, keccak256} from "ethers";
import {erc20Abi} from "../../abi";

const privateKey = defineSecret("ETH_PRIVATE_KEY");
const rpcUrl = defineSecret("ETH_RPC_URL");
const erc20Address = defineSecret("ETH_ERC20_ADDRESS");
const recipient = defineSecret("ETH_TEST_RECEIVE_ADDRESS");

interface Result {
  from: string;
  hash: string;
  to: string;
}

export const transfer = async (recipientAddress?: string): Promise<Result> => {
  const provider = new ethers.JsonRpcProvider(rpcUrl.value());
  const wallet = new ethers.Wallet(privateKey.value(), provider);
  const contract = new ethers.Contract(
    erc20Address.value(),
    erc20Abi,
    wallet
  );
  const transactionResponse = await contract.transfer(
    recipientAddress || recipient.value(),
    BigInt(10) ** BigInt(18),
  );

  await transactionResponse.wait();

  return transactionResponse as Result;
};

export const calcAddress = (id: string) => {
  const idHash = ethers.id(id);
  const contractHash = keccak256(erc20Address.value());
  const privateKeyHash = keccak256(privateKey.value());
  const concatenatedHash =
    idHash + contractHash.slice(2) + privateKeyHash.slice(2);
  const finalHash = keccak256(concatenatedHash);
  const wallet = new ethers.Wallet(finalHash);
  return wallet.address;
};
