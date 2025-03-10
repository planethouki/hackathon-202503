import {onRequest} from "firebase-functions/v2/https";

export const testSecret = onRequest({
  secrets: ["TEST_SECRET"],
}, (request, response) => {
  response.json({
    secret: process.env.TEST_SECRET,
  });
});
