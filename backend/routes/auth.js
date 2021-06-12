// External Dependencies
const express = require('express');
// Internal Dependencies
const User = require('../models/User');
const { ensureCorrectUser } = require('../middleware/auth');
const { createUserToken, decodeToken, verifyToken } = require('../helpers/tokens');
const { sendEmail, createConfirmationEmail } = require('../helpers/email');
const { getUserData } = require('../helpers/routes');

const router = express.Router();

/** POST /auth/refresh/:username => {token, user}
 * Returns a new token, and the user's information. Used on reloads by the frontend to maintain current
 * user information & a current token
 */

router.get('/refresh/:username', ensureCorrectUser, async (req, res, next) => {
  const username = req.params.username;
  const rawUser = await User.getByUsername(username);
  const user = await getUserData(rawUser);
  const token = createUserToken(user);
  return res.json({ token, user });
});

/** GET /auth/register:   { email, password } => { token, user }
 *
 * Returns JWT token which can be used to authenticate further requests, alongside the new user
 *
 * Authorization required: none
 */

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const rawUser = await User.register(email, password);
    const user = await getUserData(rawUser);
    const token = createUserToken(user);
    const emailOptions = createConfirmationEmail(email);
    await sendEmail(emailOptions);
    return res.json({ token, user });
  }
  catch (err) {
    return next(err);
  }
});

/** POST /auth/login:  { username, password } => { token, user }
 *
 * Returns JWT token which can be used to authenticate further requests, alongside the user
 *
 * Authorization required: none
 */

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const rawUser = await User.authenticate(email, password);
    const user = await getUserData(rawUser);
    const token = createUserToken(user);
    return res.json({ token, user });
  }
  catch (err) {
    return next(err);
  }
});

/** POST /auth/resend-confirmation-email {email} => {message: 'Sent!'} 
 * 
 * Resends the confirmation email to the email given and returns a sent message
 * 
 */

router.post('/resend-confirmation-email', async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailOptions = createConfirmationEmail(email);
    await sendEmail(emailOptions);
    return (res.json({ message: 'Sent!' }));
  }
  catch (err) {
    return next(err);
  }
});

/** POST /auth/confirm-email {emailToken} => {token, user} 
 * 
 * confirms that the email token given is valid for a user, and changes the user's status to confirmed
 * then returns the user alongside a new token for them
 * 
*/

router.post('/confirm-email', async (req, res, next) => {
  try {
    const { emailToken } = req.body;
    const decodedToken = decodeToken(emailToken);
    const rawUser = await User.confirmEmail(decodedToken);
    const user = await getUserData(rawUser);
    const userToken = createUserToken(user);
    return res.json({ token: userToken, user });
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;