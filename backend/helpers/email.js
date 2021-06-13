const axios = require('axios');
const { EMAIL_CONFIG } = require('../config');
const { createEmailToken } = require('./tokens')

/**
 * 
 * @param {object} options
 * attempts to send an email with the given options,
 * and returns true if it was successfuly sent, or false otherwise 
 */

async function sendEmail(options) {
  if (!options) return false;
  const { to, subject, text } = options;

  // Setup the data for the actual email
  const data = JSON.stringify({
    'recipients': [
      {
        'email': `${to}`
      }
    ],
    'title': `${subject}`,
    'html': `${text}`,
    'methods': {
      'postmark': false,
      'secureSend': false,
      'encryptContent': false,
      'secureReply': false
    }
  });

  const config = {
    method: 'post',
    url: `${EMAIL_CONFIG.url}/api/i/v1/email`,
    headers: {
      'x-trustifi-key': `${EMAIL_CONFIG.key}`,
      'x-trustifi-secret': `${EMAIL_CONFIG.secret}`,
      'Content-Type': 'application/json'
    },
    data: data
  };
  let res;

  try {
    res = await axios(config);
    console.log(res.data.meta[0].message);
  }
  catch (err) {
    res = err;
    console.log(err);
  }
  return res;
}

/**
 * 
 * @param {string} email 
 * @returns an object that contains the necessary email options to send an email confirmaiton
 * i.e. to, subject. and text (receiver, email subject, & body respectively)
 */

function createConfirmationEmail(email) {
  if (!email || typeof (email) !== 'string') return undefined;
  const subject = 'Yeti Email Confirmation';
  const token = createEmailToken(email);
  const text = `Confirm your email here:\n https://goyeti.app/confirm/${token}`;
  const options = { to: email, subject, text }
  return options;
}

module.exports = { sendEmail, createConfirmationEmail }