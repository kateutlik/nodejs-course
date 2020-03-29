const CONSTANTS = require('./const');

function encode(text, shift) {
  return [...text].map(char => getNewCharCode(char, shift)).join('');
}

function isLowerCase(char) {
  return CONSTANTS.LOWER_CASE_REGEX.test(char);
}

function isUpperCase(char) {
  return CONSTANTS.UPPER_CASE_REGEX.test(char);
}

function getFirstCharCode(char) {
  if (isUpperCase(char)) {
    return CONSTANTS.UPPER_CASE_FIRST_CHAR_CODE;
  } else if (isLowerCase(char)) {
    return CONSTANTS.LOWER_CASE_FIRST_CHAR_CODE;
  }
  return null;
}

function getNewCharCode(char, shift) {
  const charCode = char.charCodeAt(0);
  const firstCharCode = getFirstCharCode(char);

  return firstCharCode ? replaceChar(charCode, firstCharCode, shift) : char;
}
function replaceChar(charCode, firstCharCode, shift) {
  const code = ((charCode - firstCharCode + shift) % 26) + firstCharCode;
  return String.fromCharCode(code);
}

function decrypt(text, shift) {
  shift = (CONSTANTS.LETTERS_NUMBER - shift) % CONSTANTS.LETTERS_NUMBER;
  return encode(text, shift);
}

module.exports = {
  cipher: (action, shift, text) => {
    if (action === CONSTANTS.ENCODE_ACTION) {
      return encode(text, shift);
    } else if (action === CONSTANTS.DECODE_ACTION) {
      return decrypt(text, shift);
    }
  }
};
