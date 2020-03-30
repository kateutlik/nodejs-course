const CONSTANTS = require('../const/const');

/**
 * @param {string} text
 * @param {number} shift
 * @returns {string}
 */
function encode(text, shift) {
  return [...text].map(char => getNewCharCode(char, shift)).join('');
}

/**
 * @param {string} text
 * @param {number} shift
 * @returns {string}
 */
function decode(text, shift) {
  shift = (CONSTANTS.LETTERS_NUMBER - shift) % CONSTANTS.LETTERS_NUMBER;
  return encode(text, shift);
}

/**
 * @param {string} char
 * @returns {boolean}
 */
function isLowerCase(char) {
  return CONSTANTS.LOWER_CASE_REGEX.test(char);
}

/**
 * @param {string} char
 * @returns {boolean}
 */
function isUpperCase(char) {
  return CONSTANTS.UPPER_CASE_REGEX.test(char);
}

/**
 * @param {string} char
 * @returns {null|number}
 */
function getFirstCharCode(char) {
  if (isUpperCase(char)) {
    return CONSTANTS.UPPER_CASE_FIRST_CHAR_CODE;
  } else if (isLowerCase(char)) {
    return CONSTANTS.LOWER_CASE_FIRST_CHAR_CODE;
  }
  return null;
}

/**
 * @param {string} char
 * @param {number} shift
 * @returns {string}
 */
function getNewCharCode(char, shift) {
  const charCode = char.charCodeAt(0);
  const firstCharCode = getFirstCharCode(char);

  return firstCharCode ? replaceChar(charCode, firstCharCode, shift) : char;
}

/**
 * @param {number} charCode
 * @param {number} firstCharCode
 * @param {number} shift
 * @returns {string}
 */
function replaceChar(charCode, firstCharCode, shift) {
  const code =
    ((charCode - firstCharCode + shift) % CONSTANTS.LETTERS_NUMBER) +
    firstCharCode;
  return String.fromCharCode(code);
}

module.exports = {
  /**
   * @param {string} action
   * @param {number} shift
   * @param {string} text
   * @returns {string}
   */
  cipher: (action, shift, text) => {
    if (action === CONSTANTS.ENCODE_ACTION) {
      return encode(text, shift);
    } else if (action === CONSTANTS.DECODE_ACTION) {
      return decode(text, shift);
    }
  }
};
