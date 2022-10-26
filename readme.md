# ![Node/Express/Mongoose Phonebook App]

> ### REST API for working with a collection of contacts.

# Code Overview

The API contains a full set of CRUD (Create, Read, Update, Delete) operations for our tasks: get all contacts, get one contact, add a contact, update contact information, update contact status, delete a contact.

## Application Structure

- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose
- `app.js` - This file requires routes and models that we will use in the application, as well as handling 404 error and 500 server error
- `routes/` - This folder contains the route definitions for our API
- `models/` - This folder contains the model (service) to perform operations on the database and the schema definitions for our Mongoose models
- `controllers/` - This file contains the basic logic of working with our API
- `helpers/` - This folder contains the functions that allow you to optimize code creation - repeatedly apply in different places. For example to work with try/catch, to handle RequestError
- `middlewares/` - This folder contains any middleware needed for the application such as handle data validation

## Routes

`<YOUR_URL>/api/contacts`

@ GET /

- It returns the Array of all contacts in JSON format and status 200

@ GET /:contactId

- It gets the contactId parameter
- If such contactId exists, returns a contact object in JSON format and status 200
- If there is no such contactId, returns an object in JSON format {"message": "Not found"} and status 404

@ POST /

- It receives body in {name, email, phone} format (all fields are required)
- If the body doesn't have any required fields, it returns an object in JSON format{"message": "missing required name field"} and status 400
- If the body is okay, it adds a unique identifier to the contact object and saves the contact
- It returns an object in {id, name, email, phone} format and status 201

@ DELETE /:contactId

- It gets contactId parameter
- If such contactId exists, returns an object in JSON format {"message": "contact deleted"} and status 200
- If there is no such contactId, returns an object in JSON format {"message": "Not found"} and status 404

@ PUT /:contactId

- It gets contactId parameter
- It receives body in JSON format with any name, email and phone fields updated
- If body is missing, it returns an object in JSON format {"message": "missing fields"} and status 400
- If body is ok, updates contact
- It returns the updated contact object and status 200. Otherwise, it returns an object in JSON format {"message": "Not found"} and status 404

@ PATCH /:contactId/favorite

- It gets contactId parameter
- It gets the body in JSON format with the updated field favorite
- If body is missing, returns an object in JSON format {"message": "missing field favorite"} and status 400
- If the body is ok, updates contact
- It returns the updated contact object and status 200. Otherwise, it returns an object in JSON format {"message": "Not found"} and status 404

### Authentication

`<YOUR_URL>/api/users`

@ POST /register

- It creates a user from data that has been validated
- In case of successful validation in the User model, creates a user using the validated data
- If the email is already used by someone else, returns a json with the key {"message": <error from Joi or other validation library>} and status 400. Otherwise, it returns an object in JSON format {"user": {"email": <email>, "subscription": "starter"}} and status 201

@ GET /verify/:verificationToken

- It's used to check/confirm email verification
- If the user with such a token is not found, returns an object in JSON format {"message": "User not found"} and status 404
- If the user is found sets verificationToken to null, and sets verify field to true in the user document and returns an object in JSON format {"message": "Verification successful"} and status 200

@ POST /verify

- It sends an email to the user with a link for verification (In case the user deleted the registration confirmation email by mistake or the email did not reach the addressee for some reason)
- It receives the body in the format {email}
- If the body does not contain the required email field, returns a json with the key {"message": <error from Joi or other validation library>} and status 400
- If everything is fine with the body, resend the email with verificationToken to the specified email, but only if the user is not verified
- If the user has already been verified, send a json with the key {"message": "Verification has already been passed"} and status 400

@ GET /login

- It finds the user by email in the User model
- In the User model finds user by email
- If validation fails, returns a json with the key {"message": <error from Joi or other validation library>} and status 400
- Otherwise, it compares the password for the found user, if the passwords match creates a token, stores it in the current user and returns an object in JSON format {"token": <token>, "user": {"email": <email>, "subscription": "starter"}} and status 200. If the password or email is incorrect, returns a json with the key {"message": "Email or password is wrong"} and status 401

@ POST /logout

- It removes token from current user
- In the User model finds the user by \_id.
- If the user does not exist returns an object in JSON format {"message": "Not authorized"} and status 401. Otherwise, removes token from current user and returns a json with the key {status: "success"} and status 204

@ GET /current

- It gets user data by token

@ PATCH /

- It updates the user's subscription status

@ PATCH /avatars

- It allows the user to change his avatar
- It creates a 'tmp' folder in the root of the project and saves the uploaded avatar to it.
- It processes the avatar with the jimp package.
- It moves the user avatar from the tmp folder to the public folder.
- If the operation was successful returns an object in JSON format {"avatarURL": <avatarURL>} and status 200
- If the operation was unsuccessful returns an object in JSON format {"message": "Not authorized"} and status 401

## Dependencies

- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - A library to help you hash passwords.
- [cors](https://github.com/expressjs/cors) - Node.js CORS middleware
- [cross-env](https://github.com/kentcdodds/cross-env) - Cross platform setting of environment scripts
- [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from .env for nodejs projects.
- [express](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [gravatar](https://github.com/emerleite/node-gravatar) - library to generate the URLs required to request Gravatar Images and Profile data
- [jimp](https://github.com/oliver-moran/jimp) - An image processing library written entirely in JavaScript for Node, with zero external or native dependencies.
- [joi](https://github.com/hapijs/joi) - Schema description language and data validator for JavaScript
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript
- [morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for node.js
- [multer](https://github.com/expressjs/multer) - Node.js middleware for handling `multipart/form-data`
- [nanoid](https://github.com/ai/nanoid) - A tiny, secure, URL-friendly, unique string ID generator for JavaScript
- [@sendgrid/mail](https://github.com/sendgrid/sendgrid-nodejs) - Twilio SendGrid Web API v3 library package to just send email

## Error Handling

In `middlewares/`, we define a error-handling middleware for handling Mongoose's `ValidationError`. This middleware will respond with a 400 status code and format the response to have error messages the clients can understand. `authenticate` middleware checks the token and adds it to all the raouts that should be protected.

### Commands:

- `npm start` &mdash; Server start in production mode
- `npm run start:dev` &mdash; Server start in development mode
- `npm run lint` &mdash; Run code checks with eslint - must be run before each PR and fix any linter errors
- `npm lint:fix` &mdash; Same linter checker, but with automatic fixes for simple errors
