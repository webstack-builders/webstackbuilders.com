// Setup test mocks
global.__dirname = __dirname
import '../../../lib/test'

jest.mock('listr')
import Listr from 'listr'

import * as helpers from '../helpers'

test('createYargsForComponentGeneration generates a yargs handler as expected', () => {
  const result = helpers.createYargsForComponentGeneration({
    componentName: 'bazinga',
    filesFn: () => [],
    includeAdditionalTasks: () => {
      return [
        {
          title: 'Cool beans, with rad sauce',
          task: jest.fn(),
          enabled: () => true,
        },
      ]
    },
  })

  expect(result.command).toBe('bazinga <name>')
  expect(result.description).toBe('Generate a bazinga component')

  // Now lets check that tthe tasks are being called correctly
  result.handler({
    tests: false,
    stories: false,
  })

  // Get the first argument, of the first call
  // This is when listr is initialised with new Listr(listrConfig)
  const listrConfig = Listr.mock.calls[0][0]

  expect(listrConfig).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        title: 'Generating bazinga files...',
      }),
      expect.objectContaining({
        title: 'Cool beans, with rad sauce',
      }),
    ])
  )
})
