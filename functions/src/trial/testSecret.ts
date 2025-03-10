import {onRequest} from "firebase-functions/v2/https";
import {defineSecret} from "firebase-functions/params";
import {SecretManagerServiceClient} from "@google-cloud/secret-manager";

const secretMangerPrefix = defineSecret("SECRET_MANAGER_PREFIX");

export const testSecret = onRequest({
  secrets: ["TEST_SECRET"],
}, (request, response) => {
  response.json({
    secret: process.env.TEST_SECRET,
  });
});

export const testSecretClient = onRequest(
  async (request, response) => {
    const client = new SecretManagerServiceClient();
    const name = `${secretMangerPrefix.value()}/TEST_SECRET/versions/latest`;
    const [version] = await client.accessSecretVersion({name});
    const payload = version.payload?.data?.toString();
    response.json({
      secret: payload,
    });
  }
);
