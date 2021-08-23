import { any } from 'prop-types'
import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { loadStructure } from './lib/structure'

interface Props {
  [key: string]: any
}

export const toPropsStream = (props$: Props) => {
  const structure$ = loadStructure()

  return combineLatest(props$, structure$).pipe(
    map(([props, structure]) => ({ ...props, structure }))
  )
}
