import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { loadStructure } from './lib/structure'

export const toPropsStream = (props$: any) => {
  const structure$ = loadStructure()

  return combineLatest([props$, structure$]).pipe(
    map(([props, structure]: [any, any]) => ({ ...props, structure }))
  )
}
