import type { REPLEval } from "node:repl";
import type { Config } from "./config.ts";
import { createCompletionStream } from "./openai.ts";
import type { REPLContext } from "./repl-context.ts";
import { createAssistantMessage, createUserMessage } from "./message.ts";
import { newSpinner } from "./spinner.ts";

export const createEvaluator = (config: Config, ctx: REPLContext): REPLEval => {
  return async function (input, replCtx, file, cb) {
    const _input = input.trim();
    if (_input === "") {
      return this.displayPrompt();
    }

    const spinner = newSpinner().start();

    ctx.messages.push(createUserMessage(_input));

    try {
      const stream = await createCompletionStream({
        model: config.model,
        apiKey: config.apiKey,
        messages: [ctx.systemMessage, ...ctx.messages].filter((m) => !!m),
      });

      let responseBuf = "";
      for await (const chunk of stream) {
        if (chunk.choices) {
          // Stop spinner after first response
          spinner.isSpinning && spinner.stop();

          const chunkContent = chunk.choices[0]?.delta.content || "";
          responseBuf += chunkContent;
          process.stdout.write(chunkContent);
        }
      }
      process.stdout.write("\n");

      ctx.messages.push(createAssistantMessage(responseBuf));

      spinner.stop();
      return this.displayPrompt();
    } catch (error) {
      spinner.stop();
      return cb(error as Error, { input: _input });
    }
  };
};
