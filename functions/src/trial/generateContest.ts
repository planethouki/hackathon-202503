import OpenAI from "openai";
import {onRequest} from "firebase-functions/v2/https";

const prompt = `大喜利のお題を1つだけ考えてください。

・ユニークで面白いものにすること。
・日本語で出力すること。
・お題のテキストだけを出力し、前後の説明やコメントは一切不要。`;

const generate = async () => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
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

export const generateContest = onRequest({
  secrets: ["OPENAI_API_KEY"],
}, async (request, response) => {
  const result = await generate();
  response.send(result);
});

