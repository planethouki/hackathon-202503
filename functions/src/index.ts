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
import {onSchedule} from "firebase-functions/v2/scheduler";
import * as logger from "firebase-functions/logger";
import {defineSecret} from "firebase-functions/params";
import {initializeApp} from "firebase-admin/app";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

setGlobalOptions({
  region: "asia-northeast1",
});

initializeApp();

import testApp from "./testExpress";
import apiApp from "./api";

const testEnvVar = defineSecret("TEST_ENVIRONMENT_VARIABLE");

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const envTest = onRequest((request, response) => {
  logger.info("EnvTest logs!", {structuredData: true});
  response.send(testEnvVar.value() + " from Firebase!");
});

const schedule = {schedule: "0 * * * *", timeZone: "Asia/Tokyo"};
export const timerTest = onSchedule(schedule, async () => {
  logger.info("Hourly timer executed.");
});

export const testExpress = onRequest(testApp);
export const api = onRequest(apiApp);

export * from "./generateContest";
export * from "./createUserDocument";
