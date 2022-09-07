const Block = require('./Blockchain/block');


const block = new Block('foo', 'bar', 'Zoo', 'baz');
console.log(block.toString());
