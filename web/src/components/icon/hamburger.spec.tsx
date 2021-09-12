import React from 'react'
import renderer from 'react-test-renderer'

import HamburgerIcon from './hamburger'

describe('HamburgerIcon', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<HamburgerIcon />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
