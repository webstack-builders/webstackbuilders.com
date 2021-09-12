global.__dirname = __dirname
import path from 'path'

import { loadGeneratorFixture } from '../../../../lib/test'
import * as generator from '../dataMigration'

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const RealDate = Date

afterEach(() => {
  global.Date = RealDate
})

const mockDate = (isoDate) => {
  global.Date = class extends RealDate {
    constructor() {
      return new RealDate(isoDate)
    }
  }
}

test('returns exactly 1 file', async () => {
  const files = await generator.files({ name: 'MoveUser' })

  expect(Object.keys(files).length).toEqual(1)
})

test('generates a file with a timestame in its name', async () => {
  mockDate('2020-07-16T22:31:11.076Z')

  const files = await generator.files({ name: 'MoveUser' })
  const filename = path.basename(Object.keys(files)[0])

  expect(filename.split('-')[0]).toEqual('20200716223111')
})

test('generates a file with a paramcase version of the passed name', async () => {
  asyncForEach(
    ['MoveUser', 'moveUser', 'move-user', 'move_user'],
    async (name) => {
      const files = await generator.files({ name })
      const filename = path.parse(path.basename(Object.keys(files)[0])).name
      const parts = filename.split('-')
      parts.shift()

      expect(parts.join('-')).toEqual('move-user')
    }
  )
})

test('creates a file with expected contents', async () => {
  const files = await generator.files({ name: 'MoveUser' })
  const filename = Object.keys(files)[0]
  expect(files[filename]).toEqual(
    loadGeneratorFixture('dataMigration', 'dataMigration.js')
  )
})
