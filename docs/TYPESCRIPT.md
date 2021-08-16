# TypeScript Examples

### Make sure that `main`, `typings`, and a `prepublishOnly` script is defined in all TypeScript `package.json` files and declaration is set to true in `tsconfig.json`. These fields tell the consuming codebase where the type definitions are, what the entry point is, and most importantly how to build each pacakge:

```json
{
  "name": "@myorg/components",
  "version": "1.2.3",
  "main": "lib/index.js",  "typings": "lib/index.d.ts",  "scripts": {
    "prepublishOnly": "tsc"  }
}
```


### Each package defines its own `tsconfig.json` which all extend a single `tsconfig.settings.json` file placed inside the root folder:

```json
// ./tsconfig.settings.json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "jsx": "react"
  }
}

// ./packages/my-package/tsconfig.json
{
  "extends": "../tsconfig.settings.json",  "compilerOptions": {
    "outDir": "lib",    "rootDir": "src"  }
}
```

`outDir` in `tsconfig.json` should be set to the same location defined in the `main` field in `package.json`.


### Typing React components using GraphQL examples:

```javascript
type SourceProps = { description: string } & typeof defaultProps

type UrlProps = {
  site: {
    siteMetadata: {
      exampleUrl: string
    }
  }
}

const Source = ({ description, linkText }: SourceProps): ReactElement => {
  const data = useStaticQuery<UrlProps>(graphql`
    query {
      site {
        siteMetadata {
          exampleUrl
        }
      }
    }
  `)

  return (
    <>
      <p>
        {description} <br />{" "}
        <a href={data.site.siteMetadata.exampleUrl}>{linkText}</a>
      </p>
    </>
  )
}
```

```javascript
interface IndexPageProps extends PageProps {
  data: {
    site: {
      siteMetadata: {
        siteName: string
      }
    }
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        siteName
      }
    }
  }
`

export default class IndexPage extends React.Component<IndexPageProps> {
  readonly hello = `Hello`
  public render() {
    const { siteName } = this.props.data.site.siteMetadata
    return (
      <Layout>
        <h1>{this.hello} TypeScript world!</h1>
        <p>
          This site is named <strong>{siteName}</strong>
        </p>
        <Source description="Interested in details of this site?" />
      </Layout>
    )
  }
}
```


### Using Promise chained from `import` and Webstack bundling

```javascript
import(/* webpackChunkName: "momentjs" */ 'moment')
  .then((moment) => {
    // lazyModule has all of the proper types, autocomplete works,
    // type checking works, code references work \o/
    const time = moment().format()
    console.log('TypeScript >= 2.4.0 Dynamic Import Expression:')
    console.log(time)
  })
  .catch((err) => {
    console.log('Failed to load moment', err)
  })
```


### Use an arrow function to define a generic in a JSX file

Normally having angle-bracketed syntax following an equal sign indicates to the
JSX directive that JSX syntax is being used, like if using a plain type tag e.g. `<T>`
Using compiler directive `extends` hints the compiler that it's a generic.

```javascript
const foo = <T extends {}>(x: T) => x; // compiles
```


### Example Generic React Component

Since JSX doesn't have a syntax for providing a generic parameter you need to specialize
the component using a type assertion before creating it, e.g.:

```javascript
/** Generic component */

// use a generic type parameter to type check the props parameter
// with, but force it to be an array of that type parameter and
// have it as a value to a key named items. Allow any value for the
// state type parameter to React.Component.
type SelectProps<T> = { items: T[] }
// Select changes the type signature of React.Component to requiring
// a single type passed as a type parameter from the calling site
class Select<T> extends React.Component<SelectProps<T>, any> {}
// using new with Select requires a type parameter, e.g.:
const myAnnotatedSelect: Select<number> = new Select({ items: [1, 2] })
// or better, using inference:
const mySelect = new Select({ items: [1, 2] })

/** Specialization */
// can use the same name because interface is in types space and
// function is in runtime space
interface StringSelect {
  // Uses name of class in new that's having its type set,
  // new() is just a function so can have a type annotated on it
  new (): Select<string>
}
// using type assertion to force Select into type StringSelect,
// narrowing it and defining the T type variable for the const variable
const StringSelect = Select as StringSelect

/** Usage */
// no syntax to provide a generic parameter here. StringSelect has no type parameters.
const Form = () => <StringSelect items={['a', 'b']} />
```


### Convenience Generic Pattern

```javascript
import fetch from 'node-fetch'

// A convenience generic, so even though no type constraints
// between members (just on function return type), it makes
// typing the returned Promise more convenient at the call site
const getJSON = <T extends {}>(config: { url: string; headers?: { [key: string]: string } }): Promise<T> => {
  const fetchConfig = {
    method: 'GET',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(config.headers || {}),
  }

  return fetch(config.url, fetchConfig).then<T>((response: any) => response.json())
}

type LoadUsersResponse = {
  users: {
    name: string
    email: string
  }[]
}

function loadUsers() {
  return getJSON<LoadUsersResponse>({ url: 'https://example.com/users' })
}
```

### Adding a never return call to a function

Without fail(), compiling errs because the code path for 'undefined' doesn't return

```javascript
import { fail } from 'node:assert'

function foo(x: string | number): boolean {
  if (typeof x === 'string') {
    return true
  } else if (typeof x === 'number') {
    return false
  }

  fail()
}
```


### Type check an array index

```javascript
let foo: { [index: string]: { message: string } } = {}

/**
 * Must store stuff that conforms the structure
 */

foo['a'] = { message: 'some message' }
foo.b = { message: 'another message' }

foo['a'].message == foo.a.message
```

The `index` key in the `let foo:` array bracket is named arbitrarily and can be
something like `username` if that improves readability.


### Generic for array index

```javascript
// Using a limited set of string literals for array index signature

type Index = 'a' | 'b' | 'c'

type FromIndex = { [k in Index]?: number }

// no error, even though index 'a' is missing:
const good: FromIndex = { b: 1, c: 2 }

// won't compile, key `d` not in type:
// const bad: FromIndex = {b:1, c:2, d:3}

// Vocabulary can be deferred generically:
type FromSomeIndex<K extends string> = { [key in K]: number }

// error if index 'a' is missing:
const goodGeneric: FromSomeIndex<Index> = { a: 7, b: 1, c: 2 }
```


### Capturing the type of a variable

```javascript
var foo = 123

// `bar` has the same type as `foo` (here `number`)
var bar: typeof foo
```

Capture type of a class using declare for use with typeof to assign type to variable:

```javascript
class Foo {}

// Purely to capture type
declare let _foo: Foo;

let bar: typeof _foo = ...
```


### Capture keys of an object as a type using `keyof` and `typeof`

```javascript
// Use keyof to capture key names of a type captured from a variable using typeof
// Allows using a structure in both expression context and type context
const colors = {
  red: 'red',
  blue: 'blue',
}

type Colors = keyof typeof colors

let color: Colors

color = 'red' // okay
color = 'blue' // okay
//color = 'anythingElse' // Error
```


### Exception handling

- Use `new Error()` instead of `throw()` to preserve the stack trace

Don't do this, since the Error object isn't defined in the type system e.g. inferred as (value:number) => void

```javascript
function validate(value: number) {
  if (value < 0 || value > 100) throw new Error('Invalid value')
}
```

Instead do this:

```javascript
function validate(value: number): {error?: string} {
  if (value < 0 || value > 100) return {error:'Invalid value'}
}
```


### Parameter name is carried to object key

```javascript
const testBar = (myValue: string) => ({ myValue })
```

Creating an object with the above, e.g. `testBar('some value')`, results in the parameter name being used as the object key:

```json
{ "myValue": "sample" }
```


### Destructuring a method out of a new class instance to create a static property

```javascript
const { called } = new (class {
  count = 0
  called = () => {
    this.count++
    console.log(`Called : ${this.count}`)
  }
})()

called() // Called : 1
called() // Called : 2
```


### Instantiate a generic class with a concrete type

```javascript
class Foo<T> {
  foo: T
}

let FooNumber = Foo as { new (): Foo<number> }
```


### Static and regular class methods

A class has two sides to its type: the static side and the instance side. Generic classes are only generic
over their instance side rather than their static side, so when working with classes, static members
can not use the class’s type parameter.


### Generic Functions

```javascript
// generic function with a generic interface:

interface GenericIdentityFn1 {
  <T>(arg: T): T
}

function identity1<T>(arg: T): T {
  return arg
}

let myIdentity1: GenericIdentityFn1 = identity1

// non-generic function signature that is a part of a generic type:

// move the generic parameter to be a parameter of the whole interface.
// This lets us see what type(s) we’re generic over (e.g. GenericIdentityFn2<string>
// rather than just GenericIdentityFn1)

// call site needs to specify the corresponding type argument (here: number),
// effectively locking in what the underlying call signature will use

interface GenericIdentityFn2<T> {
  (arg: T): T
}

function identity2<T>(arg: T): T {
  return arg
}

let myIdentity2: GenericIdentityFn2<number> = identity2

//

function identity3(arg: string): string {
  return arg
}

let myIdentity3: GenericIdentityFn1 = identity3

//

let testIdentity1_1 = myIdentity1('help!')
let testIdentity1_2 = myIdentity1(2)

//let testIdentity2_3 = myIdentity2('help!')
let testIdentity2_4 = myIdentity2(3)
```


### Generic Factories

When creating factories in TypeScript using generics, it is necessary
to refer to class types by their constructor function:

```javascript
function create<T>(c: { new (): T }): T {
  return new c()
}
```


### Feed return type of one function into the type for another object

```javascript
function f() {
  return { x: 10, y: 1 }
}

const myObj: ReturnType<typeof f> = {
  x: 1,
  y: 2,
}
```


### Using index values to select types

```javascript
// using `keyof` and index access to get type

type Person = { age: number; name: string; alive: boolean }

type I2 = Person[keyof Person]
// type I2 = string | number | boolean

// index using `number` as an arbitrary type to get the type of an array’s elements,
// combined with `typeof` to capture the element type of an array literal

const MyArray = [
  { name: 'Alice', age: 15 },
  { name: 'Bob', age: 23 },
  { name: 'Eve', age: 38 },
]

type PersonCaptured = typeof MyArray[number]
// type Person = { name: string, age: number }
```


### Type check function signature overloads

```javascript
interface IdLabel {
  id: number
}

interface NameLabel {
  name: string
}

// with function overloads:
function overloadedCreateLabel(id: number): IdLabel
function overloadedCreateLabel(name: string): NameLabel
function overloadedCreateLabel(nameOrId: string | number): IdLabel | NameLabel

function overloadedCreateLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw 'unimplemented'
}

// using conditional types:

type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel

function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw 'unimplemented'
}

// usage:

let a = createLabel('typescript')
// let a: NameLabel

let b = createLabel(2.8)
// let b: IdLabel

let c = createLabel(Math.random() ? 'hello' : 42)
// let c: NameLabel | IdLabel

//let d = createLabel(true)
```


### Example of a constraint on T

```javascript
type MessageOf<T extends { message: unknown }> = T['message']

interface Email {
  message: string
}

type EmailMessageContents = MessageOf<Email>
// type EmailMessageContents = string
```


### Example of moving constraint in above example out and using a conditional:

```javascript
type MessageOf<T> = T extends { message: unknown } ? T['message'] : never

interface Email {
  message: string
}

interface Dog {
  bark(): void
}

type EmailMessageContents = MessageOf<Email>
// type EmailMessageContents = string

type DogMessageContents = MessageOf<Dog>
// type DogMessageContents = never
```


### Example for a flatten method that takes either arrays or primitives, using a conditional:

```javascript
type Flatten<T> = T extends any[] ? T[number] : T

// Extracts out the element type.
type Str = Flatten<string[]>
// type Str = string

// Leaves the type alone.
type Num = Flatten<number>
// type Num = number**
```


### Example for a flatten method that takes either arrays or primitives, using `infer` keyword

```javascript
//type Flatten<T> = T extends any[] ? T[number] : T
type Flatten<T> = T extends Array<infer Item> ? Item : T

// Extracts out the element type.
type Str = Flatten<string[]>
// type Str = string

// Leaves the type alone.
type Num = Flatten<number>
```


### Useful helper type aliases based on `infer`

```javascript
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return ? Return : never

type NumHelper = GetReturnType<() => number>
// type NumHelper = number

type StrHelper = GetReturnType<(x: string) => string>
// type StrHelper = string

type BoolsHelper = GetReturnType<(a: boolean, b: boolean) => boolean[]>
// type BoolsHelper = boolean[]
```


### Mapped types

```javascript
// mapped type is a generic type which uses a union of PropertyKeys, frequently
// created via a `keyof` type expression, to iterate through keys and create a type:

type OptionsFlags<T> = {
  [Property in keyof T]+?: boolean // the +? modifier is the default (allow optionals) and unnecessary
}

// Removes 'optional' attributes from a type's properties using `-` and `?` (make optionals required)
type RequiredOptionsFlags<T> = {
  [Property in keyof T]-?: boolean
}

type FeatureFlags = {
  darkMode: () => void
  newUserProfile?: () => void
}

type FeatureOptions = OptionsFlags<FeatureFlags>
const featureOptions1: FeatureOptions = { darkMode: true, newUserProfile: true }
const featureOptions2: FeatureOptions = { darkMode: true }
//const featureOptions3: FeatureOptions = { newUserProfile: true }

type RequiredFeatureOptions = RequiredOptionsFlags<FeatureFlags>
const requiredFeatureOptions1: RequiredFeatureOptions = { darkMode: true, newUserProfile: true }
//const requiredFeatureOptions2: RequiredFeatureOptions = { darkMode: true }
//const requiredFeatureOptions3: RequiredFeatureOptions = { newUserProfile: true }
```

### Distributive Conditional Types

```javascript
// When conditional types act on a generic type, they become distributive when given a union type:

type ToArray<T> = T extends any ? T[] : never
type StrArrOrNumArr = ToArray<string | number>
// type StrArrOrNumArr = string[] | number[]

// surround each side of the extends keyword with square brackets to avoid distributivity:

type ToArrayNonDist<T> = [T] extends [any] ? T[] : never
type StrOrNumArr = ToArrayNonDist<string | number> // 'StrOrNumArr' is no longer a union
// type StrOrNumArr = (string | number)[]
```


### Using string literals in types

```javascript
type PropEventSource<T> = {
  on(eventName: `${string & keyof T}Changed`, callback: (newValue: any) => void): void
}

// Create a "watched object" with an 'on' method so that you can watch for changes to properties.
declare function makeWatchedObject<T>(obj: T): T & PropEventSource<T>

const person = makeWatchedObject({
  firstName: 'Tom',
  lastName: 'Thumb',
  age: 26,
})

person.on('firstNameChanged', (newValue) => {
  console.log(`firstName was changed to ${newValue}!`)
})

//person.on('lastnameChanged', () => {})
// Argument of type "lastnameChanged" is not assignable to parameter of type
// "firstNameChanged" | "lastNameChanged" | "ageChanged"
```


### Type Guards

A type guard is some expression that performs a **runtime** check that guarantees the type in some scope.
To define a type guard, we simply need to define a function whose return type is a type predicate:

```javascript
type Fish = {}
type Bird = {}

function isFish(pet: Fish | Bird): pet is Fish {
  //                               ^^^^^^^^^^^ type predicate
  return (pet as Fish).swim !== undefined
}
```

In the above, any time `isFish` is called with some variable, TypeScript will narrow
that variable to the specific type `Fish` if the original type is compatible.


### Key Remapping via `as`

Remap keys in mapped types with an as clause in a mapped type:

```javascript
type MappedTypeWithNewProperties<Type> = {
    [Properties in keyof T as NewKeyType]: T[Properties]
}
```

Use template literal types to create new property names from prior ones:

```javascript
type Getters<T> = {
  [Property in keyof T as `get${Capitalize<string & Property>}`]: () => T[Property]
}

interface Person {
  name: string
  age: number
  location: string
}

type LazyPerson = Getters<Person>

/*
type LazyPerson = {
    getName: () => string;
    getAge: () => number;
    getLocation: () => string;
}
*/
```

Filter out keys by producing never via a conditional type:

```javascript
// Remove the 'kind' property
type RemoveKindField<T> = {
  [Property in keyof T as Exclude<Property, 'kind'>]: T[Property]
}

interface Circle {
  kind: 'circle'
  radius: number
}

type KindlessCircle = RemoveKindField<Circle>

/*
type KindlessCircle = {
    radius: number;
}
*/
```


### Definition of utility types

All utility types are Generic Types, which you can think of as a type that accepts other types
as parameters. A Generic type can be identified by being able to pass type parameters to it
using the <TypeA, TypeB, ...> syntax e.g. Record<Key, Value>


### React Class

"Notice how both the Props and State interfaces are specified as the generic parameters to the
class type. Both are optional and will be an empty object ({}) by default. By specifying a type,
TypeScript is able to strongly type this.props and this.state. Using the Readonly<T> built-in
type helper ensures TypeScript will throw an error if you attempt to modify this.state directly."

```javascript
interface Props {
  products: string[]
}

interface State {
  quantities: { [key: string]: number }
}

class ShoppingBasket extends React.Component<Props, State, Snapshot> {
  static defaultProps: Props = {
    products: [],
  }

  state: Readonly<State> = {
    quantities: this.props.products.reduce((acc, product) => {
      acc[product] = 1

      return acc
    }, {}),
  }

  // Typing React lifecycle methods: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts
  static getDerivedStateFromProps: React.GetDerivedStateFromProps<Props, State> = (props, state) => {
      return { quantities: state.quantities }
  }

  getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
      return { scrollHeight: 10 }
  }


  componentDidUpdate(prevProps: Props, prevState: State, snapshot: Snapshot) {
      console.log(snapshot.scrollHeight); // strongly-typed access to snapshot data
  }

  render() {
    const { products } = this.props
    const { quantities } = this.state

    return (
      <div>
        <ul>
          {products.map((product) => (
            <li>
              <h2>{product}</h2>

              <p>
                Quantity:
                <input
                  type="number"
                  value={quantities[product]}
                  onChange={this.onQuantityChanged(product)}
                />
              </p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

// typing a React event handler
onQuantityChanged = (product: string) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value, 10); // e.target.value would normally throw an error without typing
    this.setState({
      quantities: {
        ...this.state.quantities,
        [product]: quantity
      }
    });
  }
}

```