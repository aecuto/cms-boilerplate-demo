# hapi-mongoose-boilerplate

20scoops backend base structure for start new project using stack : nodejs as web service and mongodb as database

# Usage

### Prettier

เนื่องจากโค้ดมีการใช้ prettier ในการตรวจสอบ format ของ code ใน project เพื่อให้มี format ที่เหมือนกัน ทำให้มี error เมื่อ format ไม่ตรงตามที่ config ไว้ใน project
เราสามารถลง prettier ที่เป็น extension ของ editor ต่างๆ เช่น vscode เพื่อให้ editor สามารถแก้โค้ดให้ตรง format โดยที่เราไม่ต้องแก้เอง

[vscode](https://github.com/prettier/prettier-vscode)

[webstrom](https://www.jetbrains.com/help/webstorm/prettier.html)

[atom](https://atom.io/packages/prettier-atom)

### Setting Eslint:

- [ ] Short if ควรจะมีวงเล็บ
- [x] Comma training ถ้ามีจะเป็น error
- [x] Arrow function avoid parenthesis (warning)
- [x] Relative (require จาก library) require ต่อหลัง absolute (require จาก src) เป็น warning
- [x] ตัวแปรประกาศไม่ได้ใช้ ควรเป็น error
- [x] Var ใช้แล้วเป็น error
- [x] Let แล้วไม่มีการ reassign ค่าจะเป็น warning
- [x] ถ้ามีการ + ตัวแปร string ให้เตือน warning
- [ ] Inline style ควรเป็น warning
- [x] \_ นำหน้าไม่ควร warning/error

# Documentation

### Pattern MVC

- Model ,View ,Controller

### Definded Controller

- Handle request
- Validate request form
- Response
- Handle Business Logic

### Definded Model

- Keep Database Schema
- Manage Database Relational
- Validate Database Field

here is the documentation for models configuration  
http://docs.sequelizejs.com/manual/tutorial/models-definition.html

### Definded DAO (Data Access Object)

- Map Data into Usable Object
- Parse Data types

### Definded QueryBuilder

- Access Data, Query Database
- Control Query logic
- Provive Data to DAO

should have require the builder to be as query builder interface for build a query condition such where, offset, limit etc.

### Definded View

//

### Definded Router

- Manage URL

### Defined Middleware

- Handle pipeline of request and response
- Handle Authorization
- Pipeline before acessing to Controller

### Definded Helper

- Handle Global business logic
- Module Helper

## Definded Configuration

- Keep config or constance variable to using in Global

## Folder Structure

### Controller

path should be

```js
   ./src/modules/{modulename}/controller.js
```

if we need to split sub module for this controller
path should be

### Model

path should be

```js
    ./src/models/{modelname}.js
```

naming convention

```
 the model name should be plural and snake case for example
 user => users
 itemGroup => item_groups
```

### DAO (Data Access Object)

path should be

```js
    ./src/dao/{model}/index.js
```

for split solution is

```js
    ./src/dao/{model}/{daoname}.js
```

and should be access from index.js

### QueryBuilder

path should be

```js
    ./src/query-builder/{modelname}/index.js
```

should have require builder for set and get query data

if the builder have particular query that use only that module we need to create new builder as the module builder and extend main builder to it
for create new builder path should be

```js
    ./src/query-builder/{modelname}/builder.js
```

and the builder file should be like

```js
    const createBuildQuery = require('../builder')
    const buildQuery = createBuildQuery()

    const {medelname}Builder = () => {
        /// space for you new builder
    }

    module.exports = () => {
        ...{modelname}Builder,
        ...buildQuery
    }
```

and use it like normal require builder

### Middleware

path should be

```js
    ./src/middleware/{middlewarename}
```

using middleware on specific route use `pre` in route config

```js
//Location ./src/module/{module}/route.js
const { middleware1 } = require('../../middleware/{middleware}')

    // route
    {
        config: {
            pre: [
                { method: middleware1, assign: 'middleware1'},
                ...
            ]
        }
    }
```

and we can using data from middleware in controller by `request.pre.{assign}`

`more about pre route options` documentation is https://hapijs.com/api#-routeoptionspre

- Authentication and Authorization

  this is a submodule of middleware we have implement into base project this module is not using like normal middleware cause hapijs have a route options for authentication by itself
  the documentation is https://hapijs.com/api#-routeoptionsauth

  path `./src/middleware/authentication`

  - Authentication

    an authentication should been using as strategy in top of main route that we want to use authentication by require it from middleware then below of that line is gonna be authenticated route so if we don't want to restict the route we should add config to that route. authentication module we already have a config to set authentication as false

    ```js
        const { notAuth } = require('../../middleware/authentication')
        ....
            {
            method: 'GET',
            path: `/...`,
            config: { auth: notAuth },
            }
        ....
    ```

  - Authorization
    an authorization is about we want to restict roles that can access a route by we should set it inside the authentication module as an object and set it as scope for example
    ```js
    const authAdmin = {
      scope: 'admin'
    };
    ```
    and require to set into route config
    ```js
        const { authAdmin } = require('../../middleware/authentication')
        ....
            {
            method: 'GET',
            path: `/...`,
            config: { auth: authAdmin },
            }
        ....
    ```

### Router

router we will split into module router and main router

a module router path should be

```js
    ./src/modules/{modulename}/route.js
```

The main router is global router every module router will be access here, main router path should be here by default

```
    ./src/routes/index.js
```

### Helper

helper path should be

```js
    ./src/helpers/{helpername}/index.js
```

for sub helper is

```js
    ./src/helpers/{helpername}/{subhelpername}.js
```

and should be include to index.js

## Configuration

configuration path should be

```js
    ./src/config/{configname}.js
```

## Handler

Handler is about handling a hapi lifecycle such a onPreReponse, onPreAuth
for more https://hapijs.com/api#request-lifecycle
