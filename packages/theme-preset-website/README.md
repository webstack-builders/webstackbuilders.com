# @webstackbuilders/theme-preset-website

This is a present for Theme UI that can be extended or used in other projects.

```sh
npm i @webstackbuilders/theme-preset-website
```

To extend the theme in a project repo:

```jsx
// example extending theme
import theme from '@webstackbuilders/theme-preset-website'

export default {
  ...theme,
  styles: {
    ...theme,
  },
}
```
