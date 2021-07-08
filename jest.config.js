// not sure how to setup Jest for monorepo - each package needs its own jest config?

{
  // node_modules is skipped anywhere it's found by default using coveragePathIgnorePatterns
  "collectCoverageFrom": [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ],
  // This is to set up a directory for Istanbul code coverage reporting output:
  "coverageDirectory": "coverage",
}
