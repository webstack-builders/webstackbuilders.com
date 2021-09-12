import * as Helpers from './helpers'

describe('cn', () => {
  it('filters out false elements', () => {
    const tree = Helpers.cn([])

    expect(tree).toBeFalsy()
  })
})
