module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest/setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/e2e/'],
};
