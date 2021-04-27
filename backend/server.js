"use strict";

const app = require('./app');
const { PORT, SERVER_EMAIL } = require('./config');

app.listen(PORT, function () {
  console.log(`SERVER EMAIL ADDRESS IS: ${SERVER_EMAIL.email}`);
  console.log(`SERVER EMAIL PASSWORD IS: ${SERVER_EMAIL.password}`);
  console.log(`Started on http://localhost:${PORT}`);
});
