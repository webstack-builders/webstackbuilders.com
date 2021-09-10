/* global __DEV__ */

import { StructureBuilder } from '@sanity/structure'
import {
  defer,
  from as observableFrom,
  Observable,
  ObservableInput
  of as observableOf,
  throwError,
} from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { ListBuilder } from '@sanity/structure/dist/dts/List'
import { StructureError } from '@sanity/desk-tool/dist/dts/components/StructureError'
import { StructureNode, Builder, CollectionBuilder, Child } from '@sanity/structure/dist/dts/StructureNodes'

// Structure is a function, an observable, a promise or a structure builder
type Structure = typeof ListBuilder // | @TODO: need the other types
type StructureErrorOrNull = typeof StructureError | null

type SerializableStructureNode =
  | StructureNode
  | ObservableInput<StructureNode>
  | StructureResolver
  | CollectionBuilder
  | Child

interface StructureResolver {
  (...args: any[]): SerializableStructureNode
}

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


function isSubscribable(subject: SerializableStructureNode): subject is ObservableInput<StructureNode> {
  if (!subject) return false
  return (
    typeof (subject as Promise<StructureNode>).then === 'function' ||
    typeof (subject as Observable<StructureNode>).subscribe === 'function'
  )
}



function isStructure(structure: unknown): boolean {
  if (typeof structure === 'function' || typeof structure === 'string') return true
  if (structure && typeof structure === 'object') {
    return (
      typeof structure.serialize !== 'function' ||
      typeof structure.then !== 'function' ||
      typeof structure.subscribe !== 'function' ||
      typeof structure.type !== 'string'
    )
  }
  return false
<<<<<<< Updated upstream
}

// example
const isSerializable = (thing: SerializableStructureNode): thing is CollectionBuilder => {
  return thing && typeof (thing as Builder).serialize === 'function'
}


const isResolver = (thing: SerializableStructureNode): thing is StructureResolver => {
  return typeof thing === 'function'
}


function serializeStructure(
  item: SerializableStructureNode,
  context?: any,
  resolverArgs: any[] = []
): Observable<StructureNode> {
=======
}


/*
function serializeStructure(item, context, resolverArgs): number;
function serializeStructure(): { suit: string; card: number };
function serializeStructure(): any {
*/
function serializeStructure(item, context, resolverArgs = []) {
>>>>>>> Stashed changes
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
function getDefaultStructure(): ListBuilder {
  // An array of list items for all defined document types in the schema, and configure
  // them with the correct titles, icons, initial value templates and similar.
  const items = StructureBuilder.documentTypeListItems()

  return (
    // Group different list items within a pane.
    StructureBuilder.list()
      // Identifier for the list used to reflect the current structure state in the studio’s URL.
      .id('__root__')
      // Title for the collapsible pane.
      .title('Content')
      // Whether or not to show the icons of the list items.
      .showIcons(items.some((item) => item.getSchemaType().icon))
      // List items to display.
      .items(items)
  )
}

/**
 * We are lazy-requiring/resolving the structure inside of a function in order to catch errors
 * on the root-level of the module. Any loading errors will be caught and emitted as errors.
 */
// eslint-disable-next-line complexity
export function loadStructure() {
  let structure: Structure

  try {
    // Allow use in Studios that don't implement @sanity/desk-tool/structure or do so using CommonJS imports.
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
