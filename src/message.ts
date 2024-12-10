import type OpenAI from "openai";

export const createSystemMessage = (
  content: string,
): OpenAI.ChatCompletionMessageParam => {
  return {
    // Use `user` role instead of `system` role because o1-model does not supports `system` role
    role: "user",
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
