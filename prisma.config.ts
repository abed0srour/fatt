import { loadEnvConfig } from "@next/env";
import { defineConfig, env } from "prisma/config";

// Prisma does not read .env files on its own when a config file is present.
loadEnvConfig(process.cwd());

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
