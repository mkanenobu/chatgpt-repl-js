import { z } from "zod";
import path from "node:path";
import fs from "node:fs/promises";

export const configSchema = z.object({
  apiKey: z.string(),
  systemContext: z.string().optional(),
  model: z.string().optional().default("gpt-4o-mini"),
  temperature: z.coerce.number().optional().default(0.7),
  topP: z.coerce.number().optional().default(1.0),
});

export type Config = z.infer<typeof configSchema>;

const getConfigPath = (): string => {
  const configHome = process.env.XDG_CONFIG_HOME;
  if (configHome) {
    return path.join(configHome, "chatgpt-repl");
  }

  const home = process.env.HOME;
  if (home) {
    return path.join(home, ".config", "chatgpt-repl");
  }

  throw new Error("Could not determine configuration file path");
};

export const loadConfig = async () => {
  const configPath = getConfigPath();
  const content = await fs.readFile(path.join(configPath, "config.json"), {
    encoding: "utf-8",
  });

  return configSchema.parse(JSON.parse(content));
};

export const historyPath = (): string => {
  const configPath = getConfigPath();
  return path.join(configPath, "history.txt");
};
