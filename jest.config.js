module.exports = {
  coveragePathIgnorePatterns: ["/node_modules/", "test-.*"],
  coverageReporters: ["html", "text"],
  moduleDirectories: ["node_modules", "src"],
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "node",
};
