# Task 1. Caesar cipher CLI tool

CLI tool that encodes and decodes a text by Caesar cipher.

CLI tool accepts 4 options (short alias and full name):  
-s, --shift: a shift  
-i, --input: an input file  
[-o, --output]: an output file  
[-a, --action]: an action encode/decode

## Installing and running application:
```bash
$ git clone https://github.com/katerinautlik/nodejs-course.git
$ cd nodejs-course
$ npm i
$ node caesar-cipher-cli/index.js -s <shift: is a number> -a <action: encode || decode> [-i <string: file name>] [-o <string: file name>]
```

## Usage example:
### Files
```bash
$ node caesar-cipher-cli/index.js -a encode -s 7 -i caesar-cipher-cli/input.txt -o caesar-cipher-cli/output.txt
```
```bash
$ node caesar-cipher-cli/index.js -a decode -s 7 -i caesar-cipher-cli/output.txt -o caesar-cipher-cli/input.txt
```

> input.txt  
> This is secret. Message about "_" symbol!

> output.txt  
> Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!

### Console
```bash
$ node caesar-cipher-cli/index.js -a encode -s 7 -i caesar-cipher-cli/input.txt
```
> Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!  
  CLI is about to exit with the following code: 0
```bash
$ node caesar-cipher-cli/index.js -a decode -s 7 -i caesar-cipher-cli/output.txt
```
> This is secret. Message about "_" symbol!  
  CLI is about to exit with the following code: 0
