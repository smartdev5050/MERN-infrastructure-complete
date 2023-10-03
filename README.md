Week 14 - Day 2
[Link](https://ps-rtt-sei.herokuapp.com/15-week/mod-3/week-14/day-2/slides/)

/Week 14 - Day 2
Section 1
mern architecture

components

Pre-Work
Code the <SignUpForm>component as a class component
Add Universal Styling
The CSS for the MERN CAFE app is not trivial, so instead of adding CSS to index.css in bits and pieces, let's go ahead and add all the general purpose CSS up front:

/_ CSS Custom Properties _/
:root {
--white: #FFFFFF;
--tan-1: #FBF9F6;
--tan-2: #E7E2DD;
--tan-3: #E2D9D1;
--tan-4: #D3C1AE;
--blue: #F67F00;
--text-light: #968c84;
--text-dark: #615954;
}

_, _:before, \*:after {
box-sizing: border-box;
}

body {
margin: 0;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
background-color: var(--tan-4);
padding: 2vmin;
height: 100vh;
}

code {
font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
monospace;
}

#root {
height: 100%;
}

.align-ctr {
text-align: center;
}

.align-rt {
text-align: right;
}

.smaller {
font-size: smaller;
}

.flex-ctr-ctr {
display: flex;
justify-content: center;
align-items: center;
}

.flex-col {
flex-direction: column;
}

.flex-j-end {
justify-content: flex-end;
}

.scroll-y {
overflow-y: scroll;
}

.section-heading {
display: flex;
justify-content: space-around;
align-items: center;
background-color: var(--tan-1);
color: var(--text-dark);
border: .1vmin solid var(--tan-3);
border-radius: 1vmin;
padding: .6vmin;
text-align: center;
font-size: 2vmin;
}

.form-container {
padding: 3vmin;
background-color: var(--tan-1);
border: .1vmin solid var(--tan-3);
border-radius: 1vmin;
}

p.error-message {
color: var(--blue);
text-align: center;
}

form {
display: grid;
grid-template-columns: 1fr 3fr;
gap: 1.25vmin;
color: var(--text-light);
}

label {
font-size: 2vmin;
display: flex;
align-items: center;
}

input {
padding: 1vmin;
font-size: 2vmin;
border: .1vmin solid var(--tan-3);
border-radius: .5vmin;
color: var(--text-dark);
background-image: none !important; /_ prevent lastpass _/
outline: none;
}

input:focus {
border-color: var(--blue);
}

button, a.button {
margin: 1vmin;
padding: 1vmin;
color: var(--white);
background-color: var(--blue);
font-size: 2vmin;
font-weight: bold;
text-decoration: none;
text-align: center;
border: .1vmin solid var(--tan-2);
border-radius: .5vmin;
outline: none;
cursor: pointer;
}

button.btn-sm {
font-size: 1.5vmin;
padding: .6vmin .8vmin;
}

button.btn-xs {
font-size: 1vmin;
padding: .4vmin .5vmin;
}

button:disabled, form:invalid button[type="submit"] {
cursor: not-allowed;
background-color: var(--tan-4);
}

button[type="submit"] {
grid-column: span 2;
margin: 1vmin 0 0;
}
That's better! But rest assured we'll continue to improve the layout and styling as we continue coding out mern-infrastructure/MERN CAFE.

Next lesson we'll continue writing the code in the handleSubmit()method to send the user's sign-up info to the server using an AJAX request.

However, doing so in a way that's more likely to get you hired requires organizing such code within service & API modules...

Implement Token-Based Auth:
Add service & API modules on the client
Review of fetch
Review of handling promises with async/await
Make the AJAX request to sign-up
Define the server-side route for signing-up
Define the controllers/api/users.js module
Mock the create(sign-up) controller action
Discuss token-based authentication
Add the Usermodel
Implement the create(sign-up) controller action
Save the token in the browser's local storage
Update the userstate
Implement logging out
Implement logging in
Send the token with AJAX requests
Check the token on the server and add a userproperty to req
Implement middleware to protect server-side routes
Save MERN-Stack infrastructure to a new GH repo
mern architecture

src/components/SignUpForm/SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express)
Make the AJAX Request to Sign-Up
Okay, so the state in <SignUpForm>is ready to be sent to the server!

As we've discussed, SPAs must communicate via AJAX and we're going to utilize the users-service.js and users-api.js modules to pull this off.

Use a try/catchBlock to Catch Errors When Using async/await
Let's start back in the handleSubmitmethod in SignUpForm.jsx by setting up a try/catchblock required to handle errors when using async/await:

handleSubmit = async (evt) => {
// Prevent form from being submitted to the server
evt.preventDefault();
try {

} catch {
// An error occurred
this.setState({ error: 'Sign Up Failed - Try Again' });
}
};
Look how cleanly we are handling a failed sign-up by simply setting the errorstate property!

Ready the Sign Up Data Payload
❓ There are two extra properties on the stateobject we don't want to send to the server - what are they?
We never want to directly mutate the stateobject, so let's make a copy of it and delete those properties from it:

handleSubmit = async (evt) => {
// Prevent form from being submitted to the server
evt.preventDefault();
try {
// We don't want to send the 'error' or 'confirm' property,
// so let's make a copy of the state object, then delete them
const formData = {...this.state};
delete formData.error;
delete formData.confirm;

} catch {
...
❓ Can you think of another way to create the formDataobject that excludes the confirmand errorproperties?
const formData = {
name: this.state.name,
emai: this.state.email,
password: this.state.password
};
// or
const {name, email, password} = this.state;
const formData = {name, email, password};
formDatais now ready to send to the server. We'll follow the best practice of putting sign up related app logic in the users-service.js service module and network logic in the users-api.js API module we created last lesson.

Follow the "Coding Flow"
Even though we don't yet have the following signUpservice method being invoked, let's continue coding by following the flow from the component to the service method, then to the API/AJAX method...

SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express)
// SignUpForm.jsx

...
try {
...
delete formData.error;
// The promise returned by the signUp service method
// will resolve to the user object included in the
// payload of the JSON Web Token (JWT)
const user = await signUp(formData);
// Baby step!
console.log(user)
} catch {
...
We need to import the non-existent signUpmethod:

// SignUpForm.jsx

import { Component } from 'react';
// Add this import
import { signUp } from '../../utilities/users-service';
Now let's follow the flow and go code and export the signUpmethod in users-service.js:

// users-service.js

export async function signUp(userData) {
// Delegate the network request code to the users-api.js API module
// which will ultimately return a JSON Web Token (JWT)
const token = await usersAPI.signUp(userData);
// Baby step by returning whatever is sent back by the server
return token;
}
Note: We have not used a try/catch block because any error will propagate up to the "consumer" of the service - in this case the consumer is the handleSubmitmethod in the <SignUpForm>component.

Let's import the users-api.js using a different approach so that you can learn more about ES2015 JS modules...

// users-service.js

// Import all named exports attached to a usersAPI object
// This syntax can be helpful documenting where the methods come from
import \* as usersAPI from './users-api';
Okay, let's follow the flow and go code and export the signUpmethod in users-api.js:

// users-api.js

// This is the base path of the Express route we'll define
const BASE_URL = '/api/users';

export async function signUp(userData) {
// Fetch uses an options object as a second arg to make requests
// other than basic GET requests, include data, headers, etc.
const res = await fetch(BASE_URL, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
// Fetch requires data payloads to be stringified
// and assigned to a body property on the options object
body: JSON.stringify(userData)
});
// Check if request was successful
if (res.ok) {
// res.json() will resolve to the JWT
return res.json();
} else {
throw new Error('Invalid Sign Up');
}
}
IMPORTANT: The fetch method will not raise an error unless there's a network failure. This is why we need to check the res.okproperty to see if the server returned a successful response (status code in the 200s).

Yes, that was a lot to follow. Don't worry, you'll get used to coding the flow from component to service module to API module - hang in there!

Open the Network tab of Chrome's DevTools, then attempt to sign up. Inspect the request!

❓ What does that 404mean?
There's no route defined on the server that matches the HTTP request.

To the Express server code we go...

Define the Server-Side Route for Signing-Up
Now that the AJAX request is being made from the browser, we need a route defined on the server that matches that request!

Create the Router Module
Just like in Unit 2, we'll use an Express router module to define routes for each data resource. However, we want to help other developers know that the router is designed to respond to AJAX requests with JSON instead of rendering a template or redirecting.

To do so, we'll namespace these routes by prefacing them with /api. Additionally, we will create the route module within a routes/apifolder:

mkdir routes/api
Now let's create the router module dedicated to our users data resource:

touch routes/api/users.js
Note: This namespacing business may seem overkill until you realize that its possible to include a traditional web app that includes traditional routes/controllers/views right alongside the SPA/API code! For example, you might want to code a quick admin view that returns the status of the SPA - those routes & controllers would not be namespaced with /apiand the controller actions would respond by rendering EJS templates that return HTML instead of JSON.

The Flow of the code files
mern architecture

(React) src/components/SignUpForm/SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express) <--> Routes
Define the Route
Hopefully, this code looks somewhat familiar:

// routes/api/users.js

const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

// POST /api/users
router.post('/', usersCtrl.create);

module.exports = router;
Mount the Router
With the router being exported, we now can mount it in server.js:

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
Note how we've eliminated a line of code by requiring the router module inline.

Mapping the route to the non-existent controller action/function expectedly makes the Express server unhappy...

Define the controllers/api/users.js Module
Just like the route module, we'll namespace our controller modules as well...

💪 Practice Exercise - Set Up the Controller Module and Action (3 minutes)
Make a controllers/api folder.
Create the controllers/api/users.js module.
Set Up and export the createcontroller action.

Hint: Remember how we used module.exportsto export an object in Node modules?

The Flow of the code files
mern architecture

(React) src/components/SignUpForm/SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express) <--> Routes
Mock up the create(Sign-Up) Controller Action
Ultimately we will need to return a JSON Web Token (JWT) from the controller action after the user is added to the database.

We'll code the Usermodel and see how we create the JWT in the next lesson. For now, let's baby step and return some JSON that we can verify back in the React app:

module.exports = {
create
};

function create(req, res) {
// Baby step...
res.json({
user: {
name: req.body.name,
email: req.body.email
}
});
}
That should complete the flow from component to server and back!

Open the Console tab of Chrome's DevTools, then attempt to sign up.

Rejoice!

As a reminder, what we returned from the server is being logged by this line of code in the <SignUpForm>component:

...
const user = await signUp(formData);
// Baby step!
console.log(user)
...
The Flow of the code files
mern architecture

(React) src/components/SignUpForm/SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express) <--> Routes
What's a JSON Web Token (JWT)?
A JSON Web Token is a single encoded (not encrypted) string. Encryption makes the data completely unreadable until it's decrypted using keys, whereas, encoding simply converts one data format to another.

Some facts about JWTs:

The token can contain whatever custom data (called claims) we want to put in it.
The token is cryptographically signed by the server when it is created so that if the token is changed in any way, it is considered invalid.
The token is encoded, but not encrypted. It is encoded (converted) using a standard known as base64url encoding so that it can be serialized across the internet or even be included in a URL's querystring. It may seem that encoded data is "secret" - it's not as you'll soon see!
Here's how a JWT is structured:

There is a great website dedicated to JWTs that explains them in detail and provides a playground to create them: https://jwt.io/

Let's take a JWT from the website and demonstrate that the token can be easily decoded in the browser's console:

> const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
> const payload = jwt.split('.')[1] // only interested in the payload (claims)
> atob(payload)
> < "{"sub":"1234567890","name":"John Doe","admin":true}"
> The atob()method decodes a base-64 encoded string and btoa()base-64 encodes data.

Because the data in a JWT can be easily read, it's important not to include sensitive/secret data such as Social Security Numbers, etc.

Okay, JWT-based auth is cool, let's see how we use them in a SPA...

Typical Token-Based Flow in a SPA
The following depicts the typical flow of JWT-based auth in a SPA:

Additional clarification on the above steps:

STEP 1: Applies to logging in and signing up.
STEP 2: The JWT is created only after the login credentials have been validated, or the visitor signing up has been saved to the database.
STEP 3: After the JWT has been received by the client, it needs to be persisted, usually in local storage, so that it can be sent in future requests as needed (STEP 4).
STEP 4: We will be including the JWT with any request that needs to be authenticated on the server.
STEP 5: We will write a tidy middleware function used to validate the token and add the user data to Express's reqobject - cool beans for sure!
Add the UserModel
We need a Usermodel so that we can save the user to the DB when they sign up and retrieve the user from the DB to validate their credentials when they log in.

Create the models/user.js
Remember, the naming convention for model modules is singular:

touch models/user.js
Now let's add the typical boilerplate for the schema, then compile and export the model:

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

});

module.exports = mongoose.model('User', userSchema);
Add the Properties for the UserModel
We'll just add the minimum required for authentication:

const userSchema = new Schema({
name: {type: String, required: true},
email: {
type: String,
unique: true,
trim: true,
lowercase: true,
required: true
},
password: {
type: String,
trim: true,
minLength: 3,
required: true
}
});
There's some nice validations and transformations in there, for example:

unique: Although technically not a validator, unique: truecreates a unique index in the database which will trigger an error if violated.
trim: This transform causes Mongoose to trim spaces before and after the string before saving.
lowercase: This transform causes Mongoose to convert the string to lowercase before saving.
Be Cautious When Adding Additional Properties to the UserModel
Feel free to add additional properties/attributes about the user in your projects. However, do not add properties used to embed related data or reference 1:M/M:M relationships!. These properties should be added to the related models instead!

IMPORTANT: Keeping the User model lean is always a good practice. However, it's especially important with JWT-based authentication because the user document will be the data payload included in the JWT and you don't want the JWT to be bigger than it has to be!

Add the Options for the UserModel
Without looking at the code below...

❓ What's the option property we like to add to every schema?
Let's add it:

...
password: {
type: String,
trim: true,
minLength: 3,
required: true
}
}, {
timestamps: true
});
In addition to timestamps, let's add the toJSONoption that is used to transform the document when it's serialized to JSON (converted to a string):

...
}, {
timestamps: true,
// Even though it's hashed - don't serialize the password
toJSON: {
transform: function(doc, ret) {
delete ret.password;
return ret;
}
}
});
Automatically Hashing the Password
We never want to store passwords as plain text, known as "clear text".

Instead, we need to hash the password anytime it has changed and store the hash instead.

Hashing is a one-way process which makes it impossible to revert back to the clear text password.

❓ If the hash cannot be un-hashed back to the original password, how will we be able to verify the user's clear text password when logging in?
We could write the code to hash the password in the controller function(s), but the better practice is to make the model itself responsible so that we never have to worry about it anytime a user's password is changed.

Let's add a Mongoose pre-save hook (Mongoose middleware) that will hash the password anytime the password has changed:

// models/user.sj

...

userSchema.pre('save', async function(next) {
// 'this' is the user doc
if (!this.isModified('password')) return next();
// update the password with the computed hash
this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
return next();
});

module.exports = mongoose.model('User', userSchema);
The SALT_ROUNDSvariable determines how much processing time it will take to perform the hash. Let's define it near the top of the module:

// models/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 6; // 6 is a reasonable value
Next, we need to install and require the bcryptlibrary used to hash data.

Note: The bcrypt library is available for virtually every programming language.

Be careful of the spelling...

npm i bcrypt
Add it to the top of the module:

// models/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Add the bcrypt library
const bcrypt = require('bcrypt');
Yay - we're done coding the Usermodel!

Let's add it to crud-helper.js and test it out...

Test Drive the User Model
First, let's uncomment the following two lines in crud-helper.js:

const User = require('./models/user');
// const Item = require('./models/item');
// const Category = require('./models/category');
// const Order = require('./models/order');

// Local variables will come in handy
let user, item, category, order;
let users, items, categories, orders;
Feel free sit back and observe...

mern-infrastructure[master*] % node
Welcome to Node.js v15.2.0.
Type ".help" for more information.

> .load crud-helper.js
> // Connect to the database
> require('dotenv').config();
> require('./config/database');

// Require the Mongoose models
const User = require('./models/user');
// const Item = require('./models/item');
// const Category = require('./models/category');
// const Order = require('./models/order');

// Local variables will come in handy
let user, item, category, order;
let users, items, categories, orders;

{}

> Connected to mern-infrastructure at localhost:27017

> User.create({
> ... name: 'teo',
> ... email: 'teo@email.com',
> ... password: 'abcd'
> ... }).then(u => user = u)
> Promise { <pending> }
> user
> {
> \_id: 6003389c334a04950d6dc0de,
> name: 'teo',
> email: 'teo@email.com',
> password: '$2b$06$bU291F/dj37tJBgvdd3Hgu/a.CMKFHn/dOaP6IxDe.d3orRhOGrM2',
> createdAt: 2021-01-16T19:03:56.642Z,
> updatedAt: 2021-01-16T19:03:56.642Z,
> **v: 0
> }
> JSON.stringify(user)
> '{"\_id":"6003389c334a04950d6dc0de","name":"teo","email":"teo@email.com","createdAt":"2021-01-16T19:03:56.642Z","updatedAt":"2021-01-16T19:03:56.642Z","**v":0}'
> user.password = 'abcd1234'
> 'abcd1234'
> user.save()
> Promise { <pending> }
> user
> {
> \_id: 6003389c334a04950d6dc0de,
> name: 'teo',
> email: 'teo@email.com',
> password: '$2b$06$kA5M6FY2JvpuQUjjT6gRze5SztUUvuvl6i2P921YXlzioWohHKQVG',
> createdAt: 2021-01-16T19:03:56.642Z,
> updatedAt: 2021-01-16T19:05:37.618Z,
> \_\_v: 0
> }
> .exit
> Now you can see why it's better to make the model responsible for the hashing instead of some controller somewhere!

Questions?

3. Implement the create(Sign-Up) Controller Action
   Previously we baby stepped the createaction in the users controller to simply send back a mocked user object when a user signed up.

Now it's time to get real and:

Add the user to the database.
Create the JWT. We'll include a userproperty in the JWT's payload containing the user's document data.
Send the JWT to the client using res.json()
Add the User to the Database
We need to require the Usermodel before we can create users.

💪 Practice Exercise (1 minute)
Require the Usermodel in controllers/api/users.js.
❓ In the createcontroller action, how do we access the data sent by the client in the request?
req.body

As promised, we'll be using async/awaitwith promises, so let's set up error handling in the following refactor:

// controllers/api/users.js

function create(req, res) {
try {
// Add the user to the database
const user = await User.create(req.body);

} catch (err) {
// Client will check for non-2xx status code
// 400 = Bad Request
res.status(400).json(err);
}
}
❓ The above code causes a syntax error in the Express server because we forgot to add something - what?
Add asyncin front of functionto make it an async function.

Make that fix.

Now we're ready to create the JWT!

Create the JWT
We're going to need to install another Node module for creating and verifying JWTs.

https://jwt.io lists libraries available for your programming language of choice.

The Node module we need to install and require is named jsonwebtoken.

💪 Practice Exercise (1 minute)
Install the jsonwebtokenNode module.
Require the new module in the users controller but shorten the name of the variable to jwt.
Creating a JWT requires a "secret" string used for "signing" the JWT.

Let's define one in our .env file:

DATABASE_URL=mongodb://localhost/mern-infrastructure
SECRET=SEIRocks!
The signmethod in the jsonwebtoken library is used to create JWTs.

Let's add a createJWThelper function at the bottom of controllers/api/users.js that we can use both when a user signs up and when they log in:

/_-- Helper Functions --_/

function createJWT(user) {
return jwt.sign(
// data payload
{ user },
process.env.SECRET,
{ expiresIn: '24h' }
);
}
Note: There are several ways to specify the expiration of the JWT. Check the docs for more info.

Cool. Now let's use the createJWTfunction in the createaction and send back the newly created JWT:

async function create(req, res) {
try {
// Add the user to the database
const user = await User.create(req.body);
// token will be a string
const token = createJWT(user);
// Yes, we can use res.json to send back just a string
// The client code needs to take this into consideration
res.json(token);
} catch (err) {
// Client will check for non-2xx status code
// 400 = Bad Request
res.status(400).json(err);
}
}
Now for the moment of truth - sign up and verify that the token string is logged to the Console:

Remember the demo earlier when we decoded the payload of the JWT? Check it out!

Congrats!
Save the token in the browser's local storage
Update the userstate
Implement logging out
Implement logging in

1. Save the Token in the Browser's Local Storage
   In the previous lesson we created the JWT on the server when the visitor signed up. We also verified that the token was being sent back to the browser by logging it out in the console.

Because we will need to send the JWT to the server with any AJAX request that requires the controller action to know who the user is, we need to save the token in the client.

We can't simply assign the token to a variable or put it on state because a page refresh would loose the token.

Instead, we'll utilize the browser's localStorage to persist the JWT. This also enables the user to be logged in automatically when they browse to the app! That is, as long as the JWT hasn't expired.

❓ Where in the code does it make the most sense to persist the token to local storage?
The signUpmethod in the users-service.jsmodule (when the token has been received from the server).

Here's the refactor:

export async function signUp(userData) {
...
const token = await usersAPI.signUp(userData);
// Persist the "token"
localStorage.setItem('token', token);
...
Note: Local Storage only stores and retrieves strings. When saving, the data will automatically be converted to a string, however, you will be responsible for using JSON.parse()to convert the string retrieved from local storage back into a number, boolean, array, object, etc.

Let's verify it's working by signing up again and checking out the Local Storage in DevTool's Application tab:

❓ What did we save in the JWT's payload when we created it?
The token's payload has a userproperty that contains the data from the user's MongoDB document!

Time to put that payload to use...

2. Update the userState
   We need to set/update the userstate defined in the <App>component whenever:

The React app is loaded or refreshed.
A visitor signs up.
A user logs in.
The user logs out.
Let's start with when the app is loaded/refreshed...

Setting the userState When the Page is Loaded or Refreshed
❓ In plain language, what logic should we implement to set the userstate when the page loads/refreshes? Try to consider the three cases of token persistence in localStorage: Valid token exists; Expired token exists; and no token exists.
Retrieve the token from localStorage.
If there isn't a token, set userto null.
If there's an expired token, remove it from localStorage and set userto null.
If the token hasn't expired, extract the userobject from the payload use set the userstate to that object.
It makes sense to code much of the above logic in new getToken()and getUser()functions in users-service.js:

// users-service.js

export function getToken() {
// getItem returns null if there's no string
const token = localStorage.getItem('token');
if (!token) return null;
// Obtain the payload of the token
const payload = JSON.parse(atob(token.split('.')[1]));
// A JWT's exp is expressed in seconds, not milliseconds, so convert
if (payload.exp < Date.now() / 1000) {
// Token has expired - remove it from localStorage
localStorage.removeItem('token');
return null;
}
return token;
}

export function getUser() {
const token = getToken();
// If there's a token, return the user in the payload, otherwise return null
return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}
With those nifty functions in place, we can use getUser()in <App>to set the userstate.

First, import getUser:

// App.jsx
import { Routes, Route } from 'react-router-dom';
// Add the following import
import { getUser } from '../../utilities/users-service';
Now let's put it to use with this tiny refactor:

export default function App() {
const [user, setUser] = useState(getUser());
We could use the React Developer Tools to verify it worked, but why not just add a bit of code to render the user's name in the <NavBar>instead?

💪 Practice Exercise - Render the User's Name in <NavBar>(5 minutes)
Before <NavBar>can render the user's name, email, or whatever, you need to pass the userstate as a prop (name the prop user).
Render the user's name any way you wish in <NavBar>.
Hint: <NavBar>is currently not coded to accept any props

Setting the userState When a Visitor Signs Up
Now we can finish the sign up functionality by updating the userstate after the visitor successfully signs up.

Currently, the signUp()function in users-server.js is returning the token. However, if we take a look at the following code in SignUpForm.jsx...

// The promise returned by the signUp service method
// will resolve to the user object included in the
// payload of the JSON Web Token (JWT)
const user = await signUp(formData);
// Baby step!
console.log(user)
...we can see that we expect the signUp()function to return the user object instead.

Nothing that a quick refactor in users-service.js can't handle:

export async function signUp(userData) {
try {
...
localStorage.setItem('token', token);
// Update the following line of code
return getUser();
...
Told you that would be a quick refactor 😊

We need a way to update userstate defined in <App>from <SignUpForm>. This requires that a function be passed from <App>to <SignUpForm>via a prop.

Ordinarily, if there's business/application logic that needs to be performed other than simply updating state, we would need to write a separate function and pass it via a prop. However, in this case, we simply need to update userwith the setUser()setter function...

💪 Practice Exercise - Update userState From <SignUpForm>(5 minutes)
Pass setUserfrom <App>down the component hierarchy to <SignUpForm>.
In <SignUpForm>, replace the console.log(user)with a call to the setUserfunction, passing to it user.
Hints: Ordinarily we would need to destructure props passed to function components. However, class components like <SignUpForm>access their props as this.props.<name of the prop>so there's no destructuring or anything else necessary.

Let's use DevTools to manually clear the token from Local Storage, then sign up as a new user to test out the code!

Nice - congrats on implementing sign up functionality!

3. Implement Logging Out
   AAU, I want to be able to log out of MERN CAFE just in case someone with the munchies gets a hold of my computer.

❓ What did we just do to effectively "log out" the currently logged in user?
Removed the token from local storage and set the userstate to null.

You know the flow - start with the UI that the user is going to interact with.

Add Log Out UI
❓ Which component is the logical place to add a button or link used to log out?
<NavBar>

You already know how to use a <button>with a click handler, but we can also use React Router's <Link>if we prefer the "look" of a hyperlink vs. a button.

However, we don't want to use this particular <Link>to navigate, so we'll leave its toprop empty:

// NavBar.jsx

...

<nav>
...
&nbsp;&nbsp;<span>Welcome, {user.name}</span>
&nbsp;&nbsp;<Link to="">Log Out</Link>
</nav>
Clicking the rendered link will not navigate.

Add the onClickEvent Prop & Handler
Now let's add an onClickprop and assign an event handler:

<Link to="" onClick={handleLogOut}>Log Out</Link>
Yup, we need to code that handleLogOuthandler:

// NavBar.jsx

export default function NavBar({ user }) {
// Add the following function
function handleLogOut() {
// Delegate to the users-service
userService.logOut();
// Update state will also cause a re-render
setUser(null);
}
...
Finish Implementing Log Out Functionality
❓ We're not done yet, based upon the code in the handler, what else do we need to do?

Code and export the logOutfunction in users-service.js.
Import logOutaccording to how we wrote the line of code that uses it.
Pass the setUsersetter function as a prop to <NavBar>.
Destructure that prop.
Code the logOutFunction
All the logOutfunction needs to do is remove the token:

// users-service.js

export function logOut() {
localStorage.removeItem('token');
}
Import logOutin <NavBar>
We're going to import using the syntax that matches the way we invoked the function:

// NavBar.jsx

import { Link } from 'react-router-dom';
// Using the import below, we can call any exported function using: userService.someMethod()
import \* as userService from '../../utilities/users-service';
Note: Using the above syntax to import provides some additional context when using the imported item.

Pass the setUserSetter From <App>to <NavBar>
💪 You got this!

Destructure the setUserProp in <NavBar>
💪 Slam dunk!

Log out and celebrate:

4. Implement Logging In
   Logging in is very much like signing up!

First things first though, let's get the tedious stuff out of the way...

Create the <LoginForm>Component
Productive developers always look to copy/paste work they've already written if it makes sense to do so.

❓ Is there a component that makes sense to copy/paste as the starting point for <LoginForm>?
The <SignUpForm>is a good candidate, but we would probably want to refactor it into a function component.

There's some good news and some bad news - which do you want first?

The Good News
The <LoginForm>is below and ready to use!

// LoginForm.jsx

import { useState } from 'react';
import \* as usersService from '../../utilities/users-service';

export default function LoginForm({ setUser }) {
const [credentials, setCredentials] = useState({
email: '',
password: ''
});
const [error, setError] = useState('');

function handleChange(evt) {
setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
setError('');
}

async function handleSubmit(evt) {
// Prevent form from being submitted to the server
evt.preventDefault();
try {
// The promise returned by the signUp service method
// will resolve to the user object included in the
// payload of the JSON Web Token (JWT)
const user = await usersService.login(credentials);
setUser(user);
} catch {
setError('Log In Failed - Try Again');
}
}

return (

  <div>
    <div className="form-container" onSubmit={handleSubmit}>
      <form autoComplete="off" >
        <label>Email</label>
        <input type="text" name="email" value={credentials.email} onChange={handleChange} required />
        <label>Password</label>
        <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
        <button type="submit">LOG IN</button>
      </form>
    </div>
    <p className="error-message">&nbsp;{error}</p>
  </div>
);
}
The Bad News
💪 Practice Exercise - Implement Login Functionality (30 - 45 minutes)
Be sure to read all of the following before starting to code...

Add the <LoginForm>component above to the project following the naming convention for the folder and module.
Render the <LoginForm>below the <SignUpForm>in <AuthPage>. It will be an icebox item to display only one of the forms at a time.
Start implementing login functionality by reading the code in the handleSubmitfunction in LoginForm.jsx - that call to usersService.login(credentials)starts your journey.
IMPORTANT: The existing code in LoginForm.jsx is complete - don't change anything.

Again, follow the flow from the UI to the server and back.
Use the code and logic we used to implement Sign Up functionality as a guide. The loginfunctions that need to be added to the users-service.js and users-api.js modules are similar to the existing signUpfunctions.
FYI, the solution code uses the server-side route of POST /api/users/loginmapped to a controller action named login.
The logincontroller action is the most challenging. Although in structure it's similar to create, it has slightly different functionality - instead of creating the user we need to query for the user based upon their emailand then verify the password is correct using bcrypt's comparemethod.
Hint 1: The Usermodel's findOneis the appropriate query method to use to find a user based on their email.

Hint 2: Remember to require the bcrypt library.

Hint 3: When invoking bcrypt's comparemethod, use the syntax that returns a promise and consume it with await.

<details><summary>Peek if you must...</summary>
<p>

```js
const match = await bcrypt.compare(req.body.password, user.password);
```

</p>
</details>
Hint 4: Be sure to structure the code so that it responds with a status code of 400 if either the user is not found in the database (bad email) or if the user is found but the password doesn't match.

Feel free to use the following code if you get stuck or run out of time
See how far you can get and feel free to reach out for assistance if you get stuck - enjoy!
Icebox

Instead of showing both the <SignUpForm>and <LoginForm>simultaneously, implement showing one or the other in <AuthPage>- just like the deployed MERN CAFE does.
Hint: This is an obvious use case for a piece of ui-related state.

1. Send the Token with AJAX Requests
   In order to perform user-centric CRUD, the server of course, needs to know who the user is when they make a request.

During the discussion on token-based authentication, we learned that a token, or in our case more specifically a JWT, is used to identify the user.

So how do we include the JWT when sending a request that involves user-centric functionality?

The best practice is to send the token in a header of the request named Authorization.

What Feature Are We Going to Implement?
We could start implementing a user-centric feature of MERN CAFE, however, that would be more work than necessary, after all, we just want to implement the infrastructure of a MERN-Stack app for now.

Instead, we'll simply mock up some functionality...

AAU, I want to click a button to check the expiration of my log in.

❓ When implementing new features, where do we start?
With the UI.

Add a <button>to <OrderHistoryPage>
We'll add our feature to the <OrderHistoryPage>.

💪 Practice Exercise - Add the <button>& onClickHandler (4 minutes)
Add a <button>with the content of "Check When My Login Expires" below the current <h1>.

Hint: You must return a single root component/node.

Add an onClickprop to the <button>and assign to it a handler named handleCheckToken.
Set Up the handleCheckTokenfunction and baby step with alert('clicked');.
Ensure that clicking the button pops up the alert.
Make handleCheckTokenan asyncfunction so that we can consume promises using await.

Now, let's continue with the flow leading toward sending an AJAX request that includes the JWT...

Add the checkTokenService Function
You got this...

💪 Practice Exercise - Add the checkTokenService Function (5 minutes)
Set Up and export a checkTokenfunction in users-service.js.
Move the alert('clicked');from the handleCheckTokenfunction to the checkTokenfunction just stubbed up.
Import the checkTokenfunction into OrderHistoryPage.js using one of the two syntaxes we've previously used.
Invoke the checkTokenfunction from the handleCheckTokenfunction. Consume the promise that checkTokenwill ultimately return using awaitassigning its resolved value to a variable named expDate.
After invoking checkTokenadd a console.log(expDate).
Verify that clicking still pops up the alert.
Add the checkTokenAPI Function and Call It
Because we'll be making an AJAX request, we'll want to add another checkTokenfunction in the users-api.js API module that can be called from checkTokenin the users-service.js service module.

However, notice how the existing signUpand loginfunctions in users-api.js aren't very DRY?

Here's a really clean refactor that will DRY things up in a jiffy:

const BASE_URL = '/api/users';

export function signUp(userData) {
return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

/_--- Helper Functions ---_/

async function sendRequest(url, method = 'GET', payload = null) {
// Fetch accepts an options object as the 2nd argument
// used to include a data payload, set headers, etc.
const options = { method };
if (payload) {
options.headers = { 'Content-Type': 'application/json' };
options.body = JSON.stringify(payload);
}
const res = await fetch(url, options);
// res.ok will be false if the status code set to 4xx in the controller action
if (res.ok) return res.json();
throw new Error('Bad Request');
}
Tip: Making code more DRY usually consists of recognizing repeated code, identifying what varies between the two or more functions and define those as parameters (inputs) in a new function the existing functions can invoke.

Now we're ready to code the checkTokenfunction in users-api.js responsible for making the AJAX request to the server:

export function checkToken() {
return sendRequest(`${BASE_URL}/check-token`);
}
Note: The sendRequestfunction always returns a promise and we are passing that promise to the caller of checkToken.

Now we want to call the API module's checkTokenfrom within the checkTokenfunction in users-service.js that we coded earlier.

❓ Looking at users-service.js, do we need import checkTokenfrom users-api.js?
Let's make the call, replacing the alert('clicked'):

export function checkToken() {
// Just so that you don't forget how to use .then
return usersAPI.checkToken()
// checkToken returns a string, but let's
// make it a Date object for more flexibility
.then(dateStr => new Date(dateStr));
}
Refactor sendRequestTo Send the JWT
Finally, we're going to refactor sendRequestin users-api.js so that if there's a valid token in local storage, include it with the AJAX request in a header:

// users-api.js

// Add the following import
import { getToken } from './users-service';

...

async function sendRequest(url, method = 'GET', payload = null) {
...
if (payload) {
options.headers = { 'Content-Type': 'application/json' };
options.body = JSON.stringify(payload);
}
// Add the below code
const token = getToken();
if (token) {
// Ensure the headers object exists
options.headers = options.headers || {};
// Add token to an Authorization header
// Prefacing with 'Bearer' is recommended in the HTTP specification
options.headers.Authorization = `Bearer ${token}`;
}
...
Nice, we've got the JWT being sent to the server with AJAX requests!

2. Check the Token On the Server and Add a userProperty To req
   In Unit 2, we relied heavily on the fact that our OAuth/Passport code assigned the logged in user's document to req.user.

We want some of that goodness!

IMPORTANT: As discussed when token-based auth was introduced, the req.userproperty will contain the user's info from the JWT's payload - it will not be a MongoDB document. If you need to modify the user's document, which should be uncommon, it will have to be retrieved from the database.

Add the checkTokenMiddleware to server.js
As we learned many moons ago, middleware is used to process requests in an Express app.

Yay! Another opportunity to write a custom middleware function that:

Checks if there's a token sent in an Authorizationheader of the HTTP request. For additional flexibility, we'll also check for a token being sent as a query string parameter.
Verifies the token is valid and hasn't expired.
Decodes the token to obtain the user data from its payload.
Then finally, adds the user payload to the Express request object.
First, create the module for the middleware function in the config folder:

touch config/checkToken.js
Now for some fun code:

// config/checkToken.js

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
// Check for the token being sent in a header or as a query parameter
let token = req.get('Authorization') || req.query.token;
if (token) {
// Remove the 'Bearer ' if it was included in the token header
token = token.replace('Bearer ', '');
// Check if token is valid and not expired
jwt.verify(token, process.env.SECRET, function(err, decoded) {
// If valid token, decoded will be the token's entire payload
// If invalid token, err will be set
req.user = err ? null : decoded.user;  
 // If your app cares... (optional)
req.exp = err ? null : new Date(decoded.exp \* 1000);  
 return next();
});
} else {
// No token was sent
req.user = null;
return next();
}
};
Now we need to mount the above middleware function so that it processes every request:

// server.js

...
app.use(express.static(path.join(\_\_dirname, 'build')));

// Middleware to verify token and assign user object of payload to req.user.
// Be sure to mount before routes
app.use(require('./config/checkToken'));

...
Add a Route to Test Out the Goodness
Add the following route to routes/api/users.js:

// routes/api/users.js
...
const usersCtrl = require('../../controllers/api/users');

// GET /api/users/check-token
router.get('/check-token', usersCtrl.checkToken);
...
Create the checkTokenController Function
Keep following the flow...

// controllers/api/users.js

function checkToken(req, res) {
// req.user will always be there for you when a token is sent
console.log('req.user', req.user);
res.json(req.exp);
}
Don't forget to add checkTokento the exported object.

❓ Where did the req.expproperty come from?
The checkToken middleware function we just mounted in server.js

That should do it!

Be sure to checkout the req.userbeing logged in the Express server's terminal too:

😍 3. Implement Middleware to Protect Server-Side Routes
Any route/controller action that accesses req.userneeds to ensure that the request is coming from a logged in user.

Yup, another opportunity for a custom middleware function:

touch config/ensureLoggedIn.js
Doesn't take much code:

// config/ensureLoggedIn.js

module.exports = function(req, res, next) {
// Status code of 401 is Unauthorized
if (!req.user) return res.status(401).json('Unauthorized');
// A okay
next();
};
Now we can use it within any router module with routes that need to ensure that there's a logged in user.

Let's require it in routes/api/users.js and use it to protect the check token functionality we just coded:

// routes/api/users.js

const usersCtrl = require('../../controllers/api/users');
// require the authorization middleware function
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// Insert ensureLoggedIn on all routes that need protecting
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);
Congrats - that wraps up the infrastructure code for a MERN-Stack app!

4. Save MERN-Stack Infrastructure To a New GitHub Repo
   You'll definitely want to use the infrastructure we've coded over the last few days to launch your capstone project and likely future MERN-Stack projects as well.

First, let's update the README.md to something like:

# MERN-Stack Infrastructure

Clone this repo to provide the starter code for a comprehensive MERN-Stack project including token-based authentication.
Reset the Commit History
If you have not synced your code at any time during the 7 parts, you won't have any commits made by me and can thus skip this section.

So that you don't have commits made by your me, let's reset the local repo:

rm -rf .git
git init
Next, commit your code as it stands:

git add -A
git commit -m "MERN-Stack Infrastructure"
Create a GitHub Repo for mern-infrastructure
Next, go to your personal GitHub account and create a new repo named whatever you wish.

FYI, I'm going to name mine mern-infrastructure:

Now click to copy the new repo's URL:

Now let's add a remote that points to the new repo...

Add the Remote:
We'll need to add a remote so that we can push to the new GH repo in the cloud.

If you reset the local repo, run:

git remote add origin <paste the copied url>
Otherwise, if you didn't reset the repo because you didn't sync, run the following to change where originpoints to:

git remote set-url origin <paste the copied url>
Now you can push the code:

git push -u origin main
Congrats - refreshing the repo should confirm that the repo is ready for cloning as needed!

5. Using mern-infrastructureto Create MERN-Stack Projects in the Future
   Here's the process to create a new MERN-Stack project that starts with the infrastructure code:

Clone the mern-infrastructure repo: git clone <url of mern-infrastructure> <name-of-project>

Note that the folder created will be same as <name-of-project>instead of mern-infrastructure

cd <name-of-project>
Install the Node modules: npm i
Create a .env (touch .env) and add entries for DATABASE_URLand SECRET
Update the "name": "mern-infrastructure"in package.json to the name of your project.
Create a new repo on your personal GH account.
Copy the new GH repo's URL.
Update the remote's URL: git remote set-url origin <paste the copied GH url>
Push for the first time: git push -u origin main
Have fun coding your new project and don't forget to make frequent commits!
Final Backend Code
config folder
// /config/database.js
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on('connected', function () {
console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});
module.exports = mongoose;
// /config/checkToken.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
// Check for the token being sent in a header or a query parameter
let token = req.get('Authorization') || req.query.token;
if (token) {
token = token.replace('Bearer ', '');
// Check if token is valid and not expired
jwt.verify(token, process.env.SECRET, function(err, decoded) {
req.user = err ? null : decoded.user;
// Can remove this...
// If your app doesn't care
req.exp = err ? null : new Date(decoded.exp \* 1000);
});
return next();
} else {
// No token was sent
req.user = null;
return next();
}
};
// /config/ensureLoggedIn.js
module.exports = function(req, res, next) {
if (!req.user) return res.status(401).json('Unauthorized');
next();
};
controllers
// /controllers/api/users.js

const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
create,
login,
checkToken
};

function checkToken(req, res) {
console.log('req.user', req.user);
res.json(req.exp);
}

async function login(req, res) {
try {
const user = await User.findOne({ email: req.body.email });
if (!user) throw new Error();
const match = await bcrypt.compare(req.body.password, user.password);
if (!match) throw new Error();
res.json( createJWT(user) );
} catch {
res.status(400).json('Bad Credentials');
}
}

async function create(req, res) {
try {
const user = await User.create(req.body);
// token will be a string
const token = createJWT(user);
// send back the token as a string
// which we need to account for
// in the client
res.json(token);
} catch (e) {
res.status(400).json(e);
}
}

/_-- Helper Functions --_/

function createJWT(user) {
return jwt.sign(
// data payload
{ user },
process.env.SECRET,
{ expiresIn: '24h' }
);
}
Models
User Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new Schema({
name: {type: String, required: true},
email: {
type: String,
unique: true,
trim: true,
lowercase: true,
required: true
},
password: {
type: String,
trim: true,
minLength: 3,
required: true
}
}, {
timestamps: true,
toJSON: {
transform: function(doc, ret) {
delete ret.password;
return ret;
}
}
});

userSchema.pre('save', async function(next) {
// 'this' is the user doc
if (!this.isModified('password')) return next();
// update the password with the computed hash
this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
return next();
});

module.exports = mongoose.model('User', userSchema);
Routes API
// /routes/api/users.js
const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/users
router.post('/', usersCtrl.create);
// POST /api/users/login
router.post('/login', usersCtrl.login);

// GET /api/users/check-token
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

module.exports = router;
Crud Helper
// /crud-helper.js

// Connect to the database
require('dotenv').config();
require('./config/database');

// Require the Mongoose models
const User = require('./models/user');
// const Item = require('./models/item');
// const Category = require('./models/category');
// const Order = require('./models/order');

// Local variables will come in handy for holding retrieved documents
let user, item, category, order;
let users, items, categories, orders;
Server.js
// ./server.js

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

require('dotenv').config();
require('./config/database');

const app = express();

app.use(logger('dev'));
// there's no need to mount express.urlencoded middleware
// why is that?
app.use(express.json());
// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(**dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(**dirname, 'build')));

// Check if token and create req.user
app.use(require('./config/checkToken'));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));

// The following "catch all" route (note the _) is necessary
// to return the index.html on all non-AJAX requests
app.get('/_', function(req, res) {
res.sendFile(path.join(\_\_dirname, 'build', 'index.html'));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function() {
console.log(`Express app running on port ${port}`)
});
