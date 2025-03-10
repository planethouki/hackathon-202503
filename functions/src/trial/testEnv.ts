import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/lib/logger";
import {defineSecret} from "firebase-functions/lib/params";

const testEnvVar = defineSecret("TEST_ENVIRONMENT_VARIABLE");

export const envTest = onRequest((request, response) => {
  logger.info("EnvTest logs!", {structuredData: true});
  response.send(testEnvVar.value() + " from Firebase!");
});
