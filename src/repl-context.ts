import type OpenAI from "openai";

export type REPLContext = {
  systemMessage: OpenAI.ChatCompletionMessageParam | null;
  messages: Array<OpenAI.ChatCompletionMessageParam>;
};
