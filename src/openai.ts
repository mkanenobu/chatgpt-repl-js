import OpenAI from "openai";

let cachedClient: OpenAI;

const initClient = (apiKey: string): OpenAI => {
  if (cachedClient) return cachedClient;

  cachedClient = new OpenAI({ apiKey });
  return cachedClient;
};

export const createCompletionStream = async ({
  model,
  messages,
  apiKey,
}: {
  model: string;
  messages: Array<OpenAI.ChatCompletionMessageParam>;
  apiKey: string;
}) => {
  const client = initClient(apiKey);
  return client.chat.completions.create({
    model,
    messages,
    store: true,
    stream: true,
  });
};
