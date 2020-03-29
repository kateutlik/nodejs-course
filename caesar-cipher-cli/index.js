const { program } = require('commander');
const stream = require('./stream');
const { pipeline } = require('stream');
const validate = require('./validate');
const MESSAGES = require('./messages');

program
  .requiredOption(
    '-a, --action <action>',
    'an action encode/decode',
    validate.action
  )
  .requiredOption('-s, --shift <shift>', 'a shift', validate.shift)
  .option('-i, --input <input>', 'an input file', validate.input)
  .option('-o, --output <output>', 'an output file', validate.output)
  .parse(process.argv);

const { action, shift, input, output } = program;

pipeline(
  stream.inputStream(input),
  stream.transformStream(action, shift),
  stream.outputStream(output),
  err => {
    if (err) {
      validate.throwError(MESSAGES.GENERAL_ERROR, err);
    } else {
      console.log(MESSAGES.SUCCESS);
    }
  }
);
