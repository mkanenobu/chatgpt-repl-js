import * as repl from "node:repl";
import { createEvaluator } from "./evaluator.ts";
import { type Config, historyPath } from "./config.ts";
import type { REPLContext } from "./repl-context.ts";
import { createSystemMessage } from "./message.ts";

const prompt = "> ";

export const startRepl = async ({ config }: { config: Config }) => {
  const context: REPLContext = {
    messages: [],
    systemMessage: config.systemContext
      ? createSystemMessage(config.systemContext)
      : null,
  };
  const evaluator = createEvaluator(config, context);

  const commands: Record<string, repl.REPLCommand> = {
    clear: {
      action() {
        context.messages = [];
        this.displayPrompt();
      },
      help: "Clears the chat history",
    },
    messages: {
      action() {
        console.log(
          [
            config.systemContext
              ? createSystemMessage(config.systemContext)
              : null,
            ...context.messages,
          ].filter((m) => !!m),
        );
        this.displayPrompt();
      },
      help: "Prints the chat history",
    },
    config: {
      action() {
        console.log(config);
      },
      help: "Prints the current configuration",
    },
  };

  const r = repl.start({
    prompt,
    eval: evaluator,
    writer: () => "",
  });

  Object.entries(commands).forEach(([name, cmd]) => {
    r.defineCommand(name, cmd);
  });

  r.setupHistory(historyPath(), (err, _repl) => {
    if (err) {
      console.error("Error setting up history:", err);
    }
  });
  return r;
};
