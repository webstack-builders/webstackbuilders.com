# Theme UI Code Samples

## Themed component

```javascript
import { Link } from "gatsby"
import { Themed } from "theme-ui"

export default MyComponent = () => {
  return (
    <footer
      css={css({
        mt: 4,
        pt: 3,
      })}
    >
      <Themed.a href="http://example.com/">A themed link.</Themed.a>
      <Themed.a as={Link} to={previous.slug} rel="prev">{previous.title}</Themed.a>
      <Themed.h1 {...props} />
      <Themed.p>{excerpt}</Themed.p>
      <Themed.i css={css({ margin: `auto` })}>{text}</Themed.i>
      <Themed.p
        sx={{
          fontSize: 1,
          mt: -3,
          mb: 3,
        }}
        {...props}
      />
      <Themed.hr />
    </footer>
  )
}
