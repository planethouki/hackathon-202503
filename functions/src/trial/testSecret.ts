import {onRequest} from "firebase-functions/lib/v2/providers/https";

export const testSecret = onRequest({
  secrets: ["TEST_SECRET"],
}, (request, response) => {
  response.json({
    secret: process.env.TEST_SECRET,
  });
});

export const testNoSecret = onRequest({
  secrets: ["TEST_SECRET_NOT_FOUND"],
}, (request, response) => {
  response.json({
    secret: process.env.TEST_SECRET_NOT_FOUND,
  });
});
