import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      // Turn off unused-vars completely (deactivate both the core and TS version)
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      // Disable ban-ts-comment entirely
      "@typescript-eslint/ban-ts-comment": "off",
    },
  }),
];

export default eslintConfig;
