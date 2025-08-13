module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/v2'],
  testMatch: ['**/*.test.ts'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@v2/(.*): '<rootDir>/src/v2/$1'
  },
  transform: {
    '^.+\\.tsx?: ['ts-jest', {
      tsconfig: 'tsconfig.test.json'
    }]
  }
}