import type OpenAI from "openai";

export type REPLContext = {
  systemMessage: OpenAI.ChatCompletionSystemMessageParam | null;
  messages: Array<OpenAI.ChatCompletionMessageParam>;
};
