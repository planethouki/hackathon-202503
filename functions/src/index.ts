/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions/v2";
import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import fugaApp from "./fuga";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

setGlobalOptions({
  region: "asia-northeast1",
});

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const hoge = onRequest((request, response) => {
  logger.info("Hoge logs!", {structuredData: true});
  response.send("Hoge from Firebase!");
});

export const fuga = onRequest(fugaApp);
