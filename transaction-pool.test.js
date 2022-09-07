const TransactionPool = require('./transaction-pool');
const Transaction = require('../transactions');
const Wallet = require('./index');
const Blockchain = require('../Blockchain');

describe('TransactionPool', ()=>{
    let tp, wallet, transaction, bc;

    beforeEach(() =>{
        tp = new TransactionPool();
        wallet = new Wallet();
        bc = new Blockchain();
        transaction = Transaction.newTransaction(wallet, 'r4nd-4dr355', 30);
        tp.updateOrAddTransaction(transaction);
        
    });

    it('adds a transaction to the pool', () =>{
        expect(tp.transactions.find(t=>t.id === transaction.id)).toEqual(transaction);
    });

    it('updates a transaction inthe pool', ()=>{
        const oldTransaction = JSON.stringify(transaction);
        const newTransaction = transaction.update(wallet, 'foo-4ddr355', 40);
        tp.updateOrAddTransaction(newTransaction);

        expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction.id)))
        .not.toEqual(oldTransaction);

    });

    it('clears transactions', ()=>{
        tp.clear();
        expect((tp.transactions).toEqual([]));
    });

    describe('mixing valid and corrupt transactions', () =>{
        let validTransactions;

        beforeEach(() =>{
            validTransactions = [...tp.transactions];
            for (let i = 0; i<6 ; i++){
                wallet = new Wallet();
                transaction = wallet.createTransaction('r4nd-4ddr355', 30,bc, tp);
                if(i%2 ==0){
                    transaction.input.amount = 99999;
                } else {
                    validTransactions.push(transaction);
                }
            }

        });
    });

});