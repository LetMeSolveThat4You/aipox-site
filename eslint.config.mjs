import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "plugin:next-intl/recommended", "prettier"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "backup/**",
    ],
  },
  {
    rules: {
      // Detect inline styles in JSX
      "react/forbid-dom-props": [
        "error",
        {
          forbid: [
            {
              propName: "style",
              message: "Inline styles are not allowed. Use CSS classes instead.",
              disallowedFor: ["*"]
            }
          ]
        }
      ],
    },
  },
  {
    // next-intl settings — use recommended plugin ruleset, avoid explicit
    // rule references that may differ between plugin versions.
    settings: {
      'next-intl': {
        messagesDir: './src/i18n/messages',
        defaultLocale: 'nl',
      },
    },
    rules: {
  // Enforce no dynamic translation keys and no explicit anys for stricter safety
  'next-intl/no-dynamic-translation-key': 'error',
  '@typescript-eslint/no-explicit-any': 'error',
    },
  },
];

export default eslintConfig;
