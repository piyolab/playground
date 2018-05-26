let Web3 = require('Web3');

console.log(Web3.version);
// => 1.0.0-beta.34

// UTF8String to HexData
let data = Web3.utils.utf8ToHex('piyo');
console.log(data);
// => 0x7069796f

// HexData to UTF8String
let string = Web3.utils.hexToUtf8(data);
console.log(string);
// => piyo