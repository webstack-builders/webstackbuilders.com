import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { loadStructure } from './lib/structure'

export const toPropsStream = (props$) => {
  const structure$ = loadStructure()

  return combineLatest([props$, structure$]).pipe(
    map(([props, structure]) => ({ ...props, structure }))
  )
}
