import HamburgerIcon from 'components/icon/hamburger'
import React from 'react'

function Icon(props) {
  switch (props.symbol) {
    case 'hamburger':
      return <HamburgerIcon />
    default:
      return <span>Unknown icon: {props.symbol}</span>
  }
}

export default Icon
