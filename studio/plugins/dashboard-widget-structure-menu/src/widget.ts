import { withRouterHOC } from 'part:@sanity/base/router'
import { withPropsStream } from 'react-props-stream'
import { StructureMenu } from './components'
import { toPropsStream } from './props'

interface DashboardWidget {
  name: string
  component: JSX.Element
  layout: { width: 'auto' | 'small' | 'medium' | 'large' | 'full' }
}

/*
 * `withPropsStream` is a higher-order component that accepts a function that maps an
 * observable stream of owner props to a stream of child props, rather than directly
 * to a stream of React nodes. The child props are then passed to a base component.
 */
const StructureMenuWidget: DashboardWidget = {
  name: 'structure-menu',
  component: withRouterHOC(withPropsStream(toPropsStream, StructureMenu)),
  layout: { width: 'full' },
}

export default StructureMenuWidget
