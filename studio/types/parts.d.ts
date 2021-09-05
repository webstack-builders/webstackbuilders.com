/**
 * These typings are copy-pasted from @sanity/base/types. Sanity docs for TypeScript show
 * config to add to tsconfig.json to include this file. This file is in the studio to allow
 * modifying the any types provided by Sanity.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'all:*' {
  const anyArray: any[]

  export default anyArray
}

declare module 'config:*' {
  const pluginConfig: {[key: string]: any}

  export default pluginConfig
}

declare module 'part:*'

declare module '*.css' {
  const cssModule: {[key: string]: string}

  export default cssModule
}

/*
// this is a typings file from the sanity-plugin-dashboard-widget-netlify plugin, showing how to provide
// typings for individual sanity elements that use the part loader and are typed `any` by the above defaults

/// <reference types="react" />
declare module 'part:@sanity/components/buttons/default' {
  interface Props {
    children?: any
    onClick?: any
    inverted?: boolean
    kind?: 'default' | 'simple'
  }
  export default class DefaultButton extends React.Component<Props, any> {}
}
*/
