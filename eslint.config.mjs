import nextVitals from "eslint-config-next/core-web-vitals";

// Flat config (ESLint 9): Next 16 removed `next lint`. Same rule set as the
// old .eslintrc.json ("next/core-web-vitals").
const config = [
  ...nextVitals,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
      ".agents/**",
      ".claude/**",
      "next-env.d.ts",
      // Test setup mocks next/image with a bare <img>; `next lint` never read it.
      "jest.setup.js",
    ],
  },
];

export default config;
