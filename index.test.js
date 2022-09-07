
const Blockchain = require('./index');
const Block = require('./block');
// const { it } = require('node:test');
// const { it } = require('node:test');


describe('Blockchain', ()=> {
    let bc;

    beforeEach(() =>{
        bc = new Blockchain();
        bc2 = new Blockchain();

    });

    it('starts with genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());


    });

    it('adds a new block', () =>{
        const data = 'foo';
        bc.addBlock(data);

        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    });

    it('validates a valid chain', () => {
        bc2.addBlock('foo');

        expect(bc.isValidChain(bc2.chain)).toBe(true);

    });

    if('invalidates a chain with a corrupt genesis block', () => {
        bc2.chain[0].data = 'Bad data';

        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    if('invalidates a corrupt chain', () =>{
        bc2.addBlock('foo');
        bc2.chain[1].data = 'Not foo';

        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('replaces the chain with a valid chain',() =>{
        bc2.addBlock('goo');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).toEqual(bc2.chain);
    });

    if('does not replace the chain with one of less than or equal to length', () =>{
        bc.addBlock('foo');
        bc.replaceChain(bc2.chain);

        expect(bc.chian).not.toEqual(bc2.equal);
    });

});