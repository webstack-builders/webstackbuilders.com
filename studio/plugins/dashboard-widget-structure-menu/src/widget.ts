import { withRouterHOC } from 'part:@sanity/base/router'
import { withPropsStream } from 'react-props-stream'
import { StructureMenuWidget } from './components'
import { toPropsStream } from './props'

/*
withPropsStream(
  ownerPropsToChildProps: Observable<object> | (props$: Observable<object>) => Observable<object>,
  BaseComponent: ReactElementType
): ReactComponent
*/

export default {
  name: 'structure-menu',
  component: withRouterHOC(withPropsStream(toPropsStream, StructureMenuWidget)),
  layout: { width: 'full' },
}

/*
* `withPropsStream` is a higher-order component that accepts a function that maps an
* observable stream of owner props to a stream of child props, rather than directly
* to a stream of React nodes. The child props are then passed to a base component.
*/
