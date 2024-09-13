import type OpenAI from "openai";

export const createSystemMessage = (
  content: string,
): OpenAI.ChatCompletionSystemMessageParam => {
  return {
    role: "system",
    content,
  };
};

export const createUserMessage = (
  content: string,
): OpenAI.ChatCompletionUserMessageParam => {
  return {
    role: "user",
    content,
  };
};

export const createAssistantMessage = (
  content: string,
): OpenAI.ChatCompletionAssistantMessageParam => {
  return {
    role: "assistant",
    content,
  };
};
