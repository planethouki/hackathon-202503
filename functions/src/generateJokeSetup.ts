import OpenAI from "openai";
import {defineSecret} from "firebase-functions/params";
import {onRequest} from "firebase-functions/v2/https";

const openaiApiKey = defineSecret("OPENAI_API_KEY");

const prompt = `大喜利のお題を1つだけ考えてください。

・ユニークで面白いものにすること。
・日本語で出力すること。
・お題のテキストだけを出力し、前後の説明やコメントは一切不要。`;

const generate = async () => {
  const openai = new OpenAI({
    apiKey: openaiApiKey.value(),
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {role: "user", content: prompt},
    ],
  });

  return {
    jokeSetup: response.choices[0].message.content,
    raw: response,
  };
};

export const generateJokeSetup = onRequest(async (request, response) => {
  const result = await generate();
  response.send(result);
});

