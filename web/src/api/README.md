# API Directory for Lambda Funcions

### The src/api is a reserved Gatsby directory and is mapped to Lambda function routes:

- src/api/top-level.js => /api/top-level
- src/api/directory/foo.js => /api/directory/foo
- src/api/users/index.js => /api/users

### Request object has the following available:

- Cookies at req.cookies
- URL Queries (e.g. api/foo?query=foo) at req.query
- Form parameters and data at req.body
- JSON POST bodies at req.body
- Files uploaded from forms at req.files
- Request type e.g. `POST` at req.method

### Response helpers:

- res.send(body) — returns the response. The body can be a string, object, or buffer
- res.json(body) — returns a JSON response. The body can be any value that can be seralized with JSON.stringify()
- res.status(statusCode) — set the HTTP status for the response. Defaults to 200.
- res.redirect([statusCode], url) — Returns a redirect to a URL. Optionally set the statusCode which defaults to 302.

### Example:

```typescript
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

export default async function myHandler( // async because fetch used below
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  // POST data to an authenticated API
  const url = "https://example.com/people"
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.CLIENT_TOKEN}`,
  }
  const data = {
    name: req.body.name,
    occupation: req.body.occupation,
    age: req.body.age,
  }
  try {
    const result = await fetch(url, {
      method: "POST",
      headers: headers,
      body: data,
    }).then(res => {
      return res.json()
    })
    res.json(result)
  } catch (error) {
    res.status(500).send(error)
  }
}
```

### Custom Connect/Express middleware is supported:

```typescript
import Cors from "cors"
const cors = Cors()

export default async function corsHandler(req, res) {
  // Run Cors middleware and handle errors.
  await new Promise((resolve, reject) => {
    cors(req, res, result => {
      if (result instanceof Error) {
        reject(result)
      }
      resolve(result)
    })
  })
  res.json(`Hi from Gatsby Functions`)
}
```
