const fs = require('fs');

const CONSTANTS = require('./const');
const MESSAGES = require('./messages');
const exit = process.exit;

process.on('exit', code => console.log(`${MESSAGES.EXIT} ${code}`));

function throwError(message, code) {
  console.error(message);
  exit(code);
}

function isShiftValid(value) {
  return Number.isInteger(parseInt(value, 10));
}

function isActionValid(value) {
  return value === CONSTANTS.ENCODE_ACTION || value === CONSTANTS.DECODE_ACTION;
}

function isPathValid(value) {
  let flag = true;
  try {
    // eslint-disable-next-line no-sync
    fs.accessSync(value, fs.F_OK);
  } catch (e) {
    flag = false;
  }
  return flag;
}

module.exports = {
  shift: value => {
    if (isShiftValid(value)) {
      return parseInt(value, 10);
    }

    throwError(MESSAGES.SHIFT_ERROR, 1);
  },
  action: value => {
    if (isActionValid(value)) {
      return value;
    }

    throwError(MESSAGES.ACTION_ERROR, 1);
  },
  input: value => {
    if (isPathValid(value)) {
      return value;
    }

    throwError(MESSAGES.INPUT_ERROR, 1);
  },
  output: value => {
    if (isPathValid(value)) {
      return value;
    }

    throwError(MESSAGES.OUTPUT_ERROR, 1);
  },
  throwError
};
