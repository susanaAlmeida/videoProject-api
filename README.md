# Node.js small api

Small scalable api for small projects or personal use.

It uses babel-node to transpile the es6 features to plain js.

It contains Express, Mongoose, JsonWebToken

## Requirements

* Babel https://babeljs.io/

### How to use

* Git clone git@gitlab.com:gen-design-studio/9th-floor-api.git dirname
* ``` $ cd dirname ```
* ``` $ npm i ```
* ``` $ npm start ```
* open your browser on http://localhost:8080

API Use:

'server'.'port'/'collection'

This server has 1 db with 3 collections:

api
  Birthdays
  Meetings
  Events

The following http methods are available to be used by the http requests:

  Mandatory Options:
  {
    header: login-token
  }

  POST
    'server':'port'/'collection'
    Mandatory Options:
      headers: login_token
      data: Collection.item

  GET
    All
      'server':'port'/'collection'
      Mandatory Options:
        headers: login_token

    One (by ID)
      'server':'port'/'collection'/:id
      Mandatory Options:
        headers: login_token

    Today
      'server':'port'/'collection'/today
      Mandatory Options:
        headers: login_token

  PUT
    'server':'port'/'collection'
    Mandatory Options:
      headers: login_token
      data: Collection.item

  DELETE
    'server':'port'/'collection'/:id
    Mandatory Options:
      headers: login_token


