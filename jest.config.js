module.exports = {
  preset: 'ts-jest', // Usa ts-jest para transformar arquivos TypeScript
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transforma arquivos .ts e .tsx usando ts-jest
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'], // Extensões de arquivos que o Jest deve considerar
  transformIgnorePatterns: ['<rootDir>/node_modules/'], // Ignora arquivos em node_modules
};