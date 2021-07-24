import React from 'react'
// import { Box, BoxProps, useTheme } from '@material-ui/core'

type Props = BoxProps & {
  x?: number, // multiplier of theme.spacing
  y?: number, // multiplier of theme.spacing
  basis?: number, // multiplier of theme.spacing
}

const Spacer: React.FC<Props> = ({ x, y, basis, ...restProps }) => {
  const theme = useTheme()
  return (
    <Box
      data-testid="Spacer"
      width={x ? theme.spacing(x) : undefined}
      height={y ? theme.spacing(y) : undefined}
      flexBasis={basis ? theme.spacing(basis) : undefined}
      flexGrow={0}
      flexShrink={0}
      {...restProps}
    />
  )
}

export default Spacer
