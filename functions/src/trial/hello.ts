import {onRequest} from "firebase-functions/lib/v2/providers/https";
import {logger} from "firebase-functions";

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
