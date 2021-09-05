global.__dirname = __dirname
jest.mock('fs')
jest.mock('../../../../lib', () => {
  return {
    ...jest.requireActual('../../../../lib'),
    generateTemplate: () => '',
  }
})

import fs from 'fs'

import '../../../../lib/test'

import { files } from '../../../generate/component/component'
import { tasks } from '../component'

beforeEach(() => {
  fs.__setMockFiles(files({ name: 'About' }))
})

afterEach(() => {
  fs.__setMockFiles({})
  jest.spyOn(fs, 'unlinkSync').mockClear()
})

test('destroys component files', async () => {
  const unlinkSpy = jest.spyOn(fs, 'unlinkSync')
  const t = tasks({ componentName: 'component', filesFn: files, name: 'About' })
  t.setRenderer('silent')

  return t.run().then(() => {
    const generatedFiles = Object.keys(files({ name: 'About' }))
    expect(generatedFiles.length).toEqual(unlinkSpy.mock.calls.length)
    generatedFiles.forEach((f) => expect(unlinkSpy).toHaveBeenCalledWith(f))
  })
})

test('destroys component files including stories and tests', async () => {
  fs.__setMockFiles(files({ name: 'About', stories: true, tests: true }))
  const unlinkSpy = jest.spyOn(fs, 'unlinkSync')
  const t = tasks({
    componentName: 'component',
    filesFn: files,
    name: 'About',
    stories: true,
    tests: true,
  })
  t.setRenderer('silent')

  return t.run().then(() => {
    const generatedFiles = Object.keys(
      files({ name: 'About', stories: true, tests: true })
    )
    expect(generatedFiles.length).toEqual(unlinkSpy.mock.calls.length)
    generatedFiles.forEach((f) => expect(unlinkSpy).toHaveBeenCalledWith(f))
  })
})
