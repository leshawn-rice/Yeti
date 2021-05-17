const nodeoutlook = require('nodejs-nodemailer-outlook');
const { SERVER_EMAIL } = require('../config');
const { createEmailToken } = require('./tokens');

/**
 * 
 * @param {object} options
 * attempts to send an email with the given options,
 * and returns true if it was successfuly sent, or false otherwise 
 */

async function sendEmail(options) {
  if (!options) return false;
  const { to, subject, text } = options;
  const wasSent = await new Promise((resolve, reject) => {
    nodeoutlook.sendEmail({
      auth: {
        user: SERVER_EMAIL.email,
        pass: SERVER_EMAIL.password
      },
      from: SERVER_EMAIL.email,
      to: to,
      subject: subject,
      text: text,
      onError: (error) => {
        console.log(error);
        resolve(false);
      },
      onSuccess: (info) => {
        console.log('Email sent: ' + info.response);
        resolve(true);
      }
    });
  });
  return wasSent;
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
  const text = `Confirm your email here: https://goyeti.app/confirm/${token}\n
  Or here: localhost:3000/confirm/${token}`;
  const options = { to: email, subject, text }
  return options;
}

module.exports = { sendEmail, createConfirmationEmail }