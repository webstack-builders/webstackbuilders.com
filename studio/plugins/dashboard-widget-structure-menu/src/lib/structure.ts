/* global __DEV__ */

import { StructureBuilder } from '@sanity/structure'
import {
  defer,
  from as observableFrom,
  of as observableOf,
  throwError,
} from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { ListBuilder } from '@sanity/structure/dist/dts/List'
import { StructureError } from '@sanity/desk-tool/dist/dts/components/StructureError'

function isSubscribable(thing) {
  return (
    thing &&
    (typeof thing.then === 'function' || typeof thing.subscribe === 'function')
  )
}

function isStructure(structure) {
  return (
    structure &&
    (
      typeof structure === 'function' ||
      typeof structure.serialize !== 'function' ||
      typeof structure.then !== 'function' ||
      typeof structure.subscribe !== 'function' ||
      typeof structure.type !== 'string'
    )
  )
}


/*
function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x: any): any {
*/
function serializeStructure(item, context, resolverArgs = []) {
  // Lazy
  if (typeof item === 'function') {
    return serializeStructure(item(...resolverArgs), context, resolverArgs)
  }

  // Promise/observable returning a function, builder or plain JSON structure
  if (isSubscribable(item)) {
    return observableFrom(item).pipe(
      mergeMap((val) => serializeStructure(val, context, resolverArgs))
    )
  }

  // Builder?
  if (item && typeof item.serialize === 'function') {
    return serializeStructure(item.serialize(context))
  }

  // Plain value?
  return observableOf(item)
}

/**
 * Default implementation of @sanity/desk-tool/structure in case it's not implemented
 * in the Studio this plugin is used in.
 */
function getDefaultStructure(): typeof ListBuilder {
  const items = StructureBuilder.documentTypeListItems()
  return StructureBuilder.list()
    .id('__root__')
    .title('Content')
    .showIcons(items.some((item) => item.getSchemaType().icon))
    .items(items)
}



// Structure is a function, an observable, a promise or a structure builder
type Structure = typeof ListBuilder
type StructureErrorOrNull = typeof StructureError | null

declare var __DEV__: boolean
// module.hot is a Webpack global giving access to Webpack HMR API. import.meta.webpackHot is a
// property also exposing the HMR API. Note that only import.meta.webpackHot can be used in strict ESM.
declare var module: {
  hot: {
    // module.hot.data is state passed as the `data` parameter to `module.hot.dispose`
    // or `import.meta.webpackHot.dispose` methods, executed when the module code at the calling
    // site is replaced by HMR.
    data: {
      prevError: StructureErrorOrNull
    }
  }
}

let prevStructureError: StructureErrorOrNull = null
if (__DEV__) {
  if (module.hot && module.hot.data) {
    prevStructureError = module.hot.data.prevError
  }
}


/**
 * We are lazy-requiring/resolving the structure inside of a function in order to catch errors
 * on the root-level of the module. Any loading errors will be caught and emitted as errors.
 */
// eslint-disable-next-line complexity
export function loadStructure() {
  let structure: Structure

  try {
    // Allow use in Studios that don't implement @sanity/desk-tool/structure or do so using CommonJS imports
    const mod: Structure =
      require('part:@sanity/desk-tool/structure?') || getDefaultStructure()
    structure = mod && mod.__esModule ? mod.default : mod

    // On invalid modules, when HMR kicks in, sometimes an empty is returned when the source
    // has changed without fixing the problem. In this case, keep showing the error.
    if (
      __DEV__ &&
      prevStructureError &&
      structure &&
      structure.constructor.name === 'Object' &&
      Object.keys(structure).length === 0
    ) {
      return throwError(prevStructureError)
    }
    prevStructureError = null
  } catch (err) {
    prevStructureError = err
    return throwError(err)
  }

  if (!isStructure(structure)) {
    return throwError(
      new Error(
        `Structure needs to export a function, an observable, a promise or a structure builder, got ${typeof structure}`
      )
    )
  }

  // Defer to catch immediately thrown errors on serialization
  return defer(() => serializeStructure(structure))
}
