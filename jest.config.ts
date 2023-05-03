import type { Config } from "jest";

const config: Config = {
  testMatch: ["**/__tests__/**/*.+(ts)", "**/?(*.)+(spec|test).+(ts)"],
  collectCoverage: true,
  coverageReporters: ["text"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

export default config;
