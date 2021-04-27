const jwt = require('jsonwebtoken');
const nodeoutlook = require('nodejs-nodemailer-outlook');
const { SERVER_EMAIL } = require('../config');
const { createEmailToken } = require('./tokens');

function sendEmail(options) {
  const { to, subject, text } = options;
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
    },
    onSuccess: (info) => {
      console.log('Email sent: ' + info.response);
    }
  });
}

function createConfirmationEmail(email) {
  const subject = 'Yeti Email Confirmation';
  const token = createEmailToken(email);
  const text = `Confirm your email here: https://goyeti.app/confirm/${token}\n
  Or here: localhost:3000/confirm/${token}`;
  const options = { to: email, subject, text }
  return options;
}

module.exports = { sendEmail, createConfirmationEmail }