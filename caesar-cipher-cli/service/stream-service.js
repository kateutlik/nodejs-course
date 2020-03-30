const fs = require('fs');
const { EOL } = require('os');
const { Transform } = require('stream');
const { cipher } = require('./cipher-service');

const MESSAGES = require('../const/messages');

/**
 * @param {string} path
 * @returns {boolean}
 */
function isPathDefined(path) {
  return path !== undefined;
}

/**
 * @param {string} path
 * @returns {ReadStream}
 */
function createReadStream(path) {
  return fs.createReadStream(path, { encoding: 'utf-8' });
}

/**
 * @param {string} path
 * @returns {WriteStream}
 */
function createWriteStream(path) {
  return fs.createWriteStream(path, { encoding: 'utf8', flags: 'a' });
}

/**
 * @returns {NodeJS.ReadStream}
 */
function startStdin() {
  process.stdout.write(MESSAGES.STDIN_STRING);
  process.stdin.setEncoding('utf-8');

  return process.stdin;
}

/**
 * @returns {NodeJS.WriteStream}
 */
function startStdout() {
  return process.stdout;
}

module.exports = {
  /**
   * @param {string} path
   * @returns {ReadStream}
   */
  inputStream: path => {
    return isPathDefined(path) ? createReadStream(path) : startStdin();
  },
  /**
   * @param {string} path
   * @returns {WriteStream}
   */
  outputStream: path => {
    return isPathDefined(path) ? createWriteStream(path) : startStdout();
  },
  /**
   * @param {string} action
   * @param {number} shift
   * @returns {module:stream.internal.Transform}
   */
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
