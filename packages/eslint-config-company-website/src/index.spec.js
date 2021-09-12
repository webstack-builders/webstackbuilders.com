const eslint = require('eslint')

const getErrors = () => {
  const CLIEngine = eslint.CLIEngine
  const cli = new CLIEngine()

  return cli.executeOnText('')
}

describe('Validate ESLint configs', () => {
  it(`load config in ESLint to validate all rules are correct`, () => {
    expect(getErrors().results[0].messages).toEqual([])
  })
})

export {}
