module.exports = {
   testEnviroment: 'node',
   testMatch: [
    '**/__tests__/**/*.test.js', 
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  testEnvironment: 'node', // ou 'jsdom' dependendo do ambiente
  setupFilesAfterEnv: ['./jest.setup.js'], // se precisar de configurações adicionais
  };
  