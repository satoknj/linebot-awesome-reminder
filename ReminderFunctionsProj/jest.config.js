module.exports = {
    "roots": [
      "<rootDir>/AwesomeRemind",
      "<rootDir>/RemindDb"
    ],
    "testMatch": [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "modulePathIgnorePatterns": [
      "integration"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
}