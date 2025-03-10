import {onRequest} from "firebase-functions/v2/https";

import erc20App from "./trial/testErc20";
export const eth = onRequest(erc20App);

import testApp from "./trial/testExpress";
export const testExpress = onRequest(testApp);

export * from "./trial/generateContest";
export * from "./trial/hello";
export * from "./trial/testCall";
export * from "./trial/testEnv";
export * from "./trial/testTimer";
export * from "./trial/testSecret";
