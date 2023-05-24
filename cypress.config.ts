import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
  },
  video: false,
  env: {
    "supportFile": "cypress/support/e2e.ts",
  },
});
