"use strict";

const app = require('./app');
const { PORT, SERVER_EMAIL } = require('./config');

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});
