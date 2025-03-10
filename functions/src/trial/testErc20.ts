import * as express from "express";
import {onRequest} from "firebase-functions/v2/https";
import {defineSecret, defineString} from "firebase-functions/params";
import {ethers} from "ethers";
import {erc20Abi} from "../abi";

const privateKey = defineSecret("ETH_PRIVATE_KEY");
const rpcUrl = defineString("ETH_RPC_URL");
const erc20Address = defineString("ETH_ERC20_ADDRESS");
const recipient = defineString("ETH_TEST_RECEIVE_ADDRESS");

const app = express();

app.get("/", async (req, res) => {
  const provider = new ethers.JsonRpcProvider(rpcUrl.value());
  const wallet = new ethers.Wallet(privateKey.value(), provider);
  const contract = new ethers.Contract(
    erc20Address.value(),
    erc20Abi,
    wallet
  );
  const transactionResponse = await contract.transfer(
    recipient.value(),
    1,
  );

  await transactionResponse.wait();
  res.json({
    message: "Hello World!",
    result: transactionResponse,
  });
});

export const eth = onRequest({
  secrets: [privateKey],
}, app);
