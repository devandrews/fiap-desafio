module.exports = {
  collectCoverageFrom: ['<rootDit>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDit>/tests/$1',
    '@/(.+)': '<rootDit>/src/$1'
  },
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  transform: {
    '\\.ts$': 'ts-jest'
  }
}
