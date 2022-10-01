# ![Node/Express/Mongoose Phonebook App]

> ### REST API for working with a collection of contacts.

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm run start:dev` to start the local server

# Code Overview

The API contains a full set of CRUD (Create, Read, Update, Delete) operations for our tasks: get all contacts, get one contact, add a contact, update contact information, update contact status, delete a contact.

## Dependencies

- [cors](https://github.com/expressjs/cors) - Node.js CORS middleware
- [cross-env](https://github.com/kentcdodds/cross-env) - Cross platform setting of environment scripts
- [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from .env for nodejs projects.
- [express](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [joi](https://github.com/hapijs/joi) - Schema description language and data validator for JavaScript
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript
- [morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for node.js

## Application Structure

- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose.
- `app.js` - This file requires routes and models that we will use in the application, as well as handling 404 error and 500 server error
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the model (service) to perform operations on the database and the schema definitions for our Mongoose models
- `controllers/` - This file contains the basic logic of working with our API.
- `helpers/` - This folder contains the functions that allow you to optimize code creation - repeatedly apply in different places. For example to work with try/catch, to handle RequestError.
- `middlewares/` - This folder contains any middleware needed for the application such as handle data validation

## Error Handling

In `middlewares/`, we define a error-handling middleware for handling Mongoose's `ValidationError`. This middleware will respond with a 400 status code and format the response to have error messages the clients can understand

## Authentication

app.js - web server on express and morgan and cors middlewares.

Rautings to work with a collection of contacts:

### Commands:

- `npm start` &mdash; Server start in production mode
- `npm run start:dev` &mdash; Server start in development mode
- `npm run lint` &mdash; Run code checks with eslint - must be run before each PR and fix any linter errors
- `npm lint:fix` &mdash; Same linter checker, but with automatic fixes for simple errors
