import {defineSecret} from "firebase-functions/params";
import {ethers} from "ethers";
import {erc20Abi} from "../../abi";

const privateKey = defineSecret("ETH_PRIVATE_KEY");
const rpcUrl = defineSecret("ETH_RPC_URL");
const erc20Address = defineSecret("ETH_ERC20_ADDRESS");

interface Result {
  from: string;
  hash: string;
  to: string;
}

/**
 * Transfers a small amount of tokens
 * from the wallet to a predefined recipient address.
 *
 * @param {string} recipientAddress - The address of the recipient.
 * @return {Promise<Result>} - The details of the transaction.
 */
async function transfer(recipientAddress: string): Promise<Result> {
  const provider = new ethers.JsonRpcProvider(rpcUrl.value());
  const wallet = new ethers.Wallet(privateKey.value(), provider);
  const contract = new ethers.Contract(
    erc20Address.value(),
    erc20Abi,
    wallet
  );
  const transactionResponse = await contract.transfer(
    recipientAddress,
    1,
  );

  await transactionResponse.wait();

  return transactionResponse as Result;
}

export default transfer;
