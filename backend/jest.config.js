module.exports = {
  roots: ['<rootDir>/test'],
  testMatch: ['**/?(*.)+(spec|test|AuthController).[jt]s?(x)'], // Dodaj wzorzec pasujący do Twoich plików
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
