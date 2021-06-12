# Yeti - Engage with your Community

[![Build Status](https://travis-ci.com/leshawn-rice/yeti.svg?branch=main)](https://travis-ci.com/leshawn-rice/yeti) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![GitHub issues open](https://img.shields.io/github/issues/leshawn-rice/yeti)](https://github.com/leshawn-rice/yeti/issues)

[<img src="frontend/public/favicon.ico"> (Click to Visit) ](https://goyeti.app/)

### Yeti brings communities together through location-based interaction!

# The What

### Yeti is a full-stack application developed with both desktop, and mobile experiences in mind. Yeti uses users' locations to connect them with others in their surrounding areas, and allows them to post, comment, rate, and save content that others in their area create!

# The How

## Backend
### - Nodejs
### - Express
### - PostgreSQL
### - Bcrypt & JWT
### - Heroku

## Frontend
### - React
### - Redux
### - FontAwesome

## API
### - IPINFO API
### - Window Navigator API

# The Why

## Backend
For the backend, I chose to use a Node/Express setup on the backend because:
 - Keeping the backend/frontend both in Javascript makes switching between the two faster and more efficient
 - Nodejs can handle asynchronous operations while Python cannot, and this project needed operations to be handled asynchronously on the backend (handling email,login,registration, and posting operations all at once rather than sequentially)

I used PostgreSQL for the database because, since I'm dealing with users, posts, and comments, all of which can be managed easily with classes, an ORDBMS like Postgres allowed me to take advantage of OOP concepts in handling my database.

I hosted the backend on Heroku because Heroku is a cheap, scalable way to quickly push a live project

## Frontend
For the frontend, I chose to use React because it's use of components allowed me to reuse the logic for posts & comments, as well as develop a SPA using React-Router. 

I chose to use Redux (and Redux-Persist) instead of the useContext hook and localstorage because I had many components on different levels in the component hierarchy that needed access to things like the user, loaded posts, comments etc. and redux stores its state in the global scope. Additionally, since redux-persist manages to keep state persistent across visits without much logic, it was simpler and more compatible with redux than using something like localstorage or cookies.

# Using Yeti

### To download Yeti, simply do the following: 
1. Download the code and run ```npm install``` in the terminal in both the backend and frontend folders.
2. Seed the database by navigating to the backend folder, and running ```psql < yeti.sql```
3. Open up the backend folder, and run ```nodemon```
4. Open up the frontend folder, and run ```npm start```
5. Run tests with the command ```npm run test``` in either folder.

# User Flow

The general user flow for Yeti goes as follows: 

1. Login/Sign Up if not already logged in
2. Confirm email if that hasn't already been done
3. Check your local area for interesting posts/comments
4. Uprate, Downrate, and Save posts/comments you find interesting
5. Check out your profile and see if your rating has increased and the ratings of your posts/comments