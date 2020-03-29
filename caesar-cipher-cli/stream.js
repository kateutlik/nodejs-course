const fs = require('fs');
const { EOL } = require('os');
const { Transform } = require('stream');
const { cipher } = require('./cipher.js');

const MESSAGES = require('./messages');

function isPathDefined(path) {
  return path !== undefined;
}

function createReadStream(path) {
  return fs.createReadStream(path, { encoding: 'utf-8' });
}

function createWriteStream(path) {
  return fs.createWriteStream(path, { encoding: 'utf8', flags: 'a' });
}

function startStdin() {
  process.stdout.write(MESSAGES.STDIN_STRING);
  process.stdin.setEncoding('utf-8');

  return process.stdin;
}
function startStdout() {
  return process.stdout;
}

module.exports = {
  inputStream: path => {
    return isPathDefined(path) ? createReadStream(path) : startStdin();
  },
  outputStream: path => {
    return isPathDefined(path) ? createWriteStream(path) : startStdout();
  },
  transformStream: (action, shift) => {
    return new Transform({
      objectMode: true,
      transform(chunk, encoding, callback) {
        const result = `${cipher(action, shift, chunk)}${EOL}`;
        callback(null, result);
      }
    });
  }
};
