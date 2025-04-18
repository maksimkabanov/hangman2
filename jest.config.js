export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },

  testMatch: ["**/__tests__/**/*.test.tsx"],

  globals: {
    "ts-jest": {
      useESM: true,
      tsconfig: {
        jsx: "react-jsx",
        module: "ESNext",
        target: "ES2020",
        moduleResolution: "bundler",
        isolatedModules: true,
        allowImportingTsExtensions: true,
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
      },
    },
  },

  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },
};
