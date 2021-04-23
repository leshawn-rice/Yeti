const fs = require('fs');

/**
 * 
 * @param {string} path 
 * @returns data from the file at the given path
 */
function readFile(path) {
  return fs.readFileSync(path, 'utf8');
}


/**
 * 
 * @param {Array} arr 
 * @returns a random element in the given array
 */
function getRandomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 
 * @param {string} str 
 * @returns a string matching str but with the first letter capitalized
 */

const capitalizeString = (str) => {
  if (typeof str !== 'string') return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 
 * @param {string} username 
 * @param {Array of Objects} usernames 
 * @returns true if the username matches a username in the array of objects
 *          otherwise returns false
 */

function checkIfUsernameTaken(username, usernames) {
  for (let user of usernames) {
    if (user.username === username) return true;
  }
  return false;
}

/**
 * 
 * @param {Array of Objects} usernames 
 * @returns a new username in the pattern MythicalAnimal that does not
 *          already exist in usernames
 */

function generateUsername(usernames) {
  // file path is from root directory (dir that server.js is in)
  const animals = readFile('./helpers/animals.txt').split('\n');
  const mythicals = readFile('./helpers/mythical.txt').split('\n');

  let usernameChosen = false;
  let username;

  while (!usernameChosen) {
    let mythical = capitalizeString(getRandomChoice(mythicals).toLowerCase());
    let animal = capitalizeString(getRandomChoice(animals).toLowerCase());
    username = mythical + animal;
    if (!checkIfUsernameTaken(username, usernames)) usernameChosen = true;
  }
  return username;
}

module.exports = { generateUsername }