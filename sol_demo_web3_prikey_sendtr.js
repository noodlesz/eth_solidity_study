/**
 *
 *  利用web3，通过私钥签名发送交易
 *
 *   @type {Ut}
 */


var Web3 = require('web3');
//http://localhost:7545 为Ganache提供的节点链接
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));


var Tx = require('ethereumjs-tx');
var privateKey = new Buffer('24d43b44aa91be762ce7926fff91c53ea70fc5390b0aac77b7b57d3f72df5a8e', 'hex')

var _from = '0x6915ccfb8f3215ac55415d81fb1df7b5363b426a';
var number = web3.eth.getTransactionCount(_from).toString(16);

//这里的转化好像有点问题啊
var sendvalue =  "20000000000000000".toString('hex');
                  //2000000000000000000

var  gasPriceValue = "20000".toString('hex');
var  gasLimitValue = "6727".toString('hex');

var rawTx = {

    nonce: '0x'+number, //随机数
    gasPrice: '0x'+gasPriceValue,
    gasLimit: '0x'+gasLimitValue,
    to: '0xe4e418567e06efe211f57b69e1d0004b8d65e8a5',//接受方地址或者合约地址
    value: '0x'+sendvalue, //发送的金额，这里是16进制，实际表示发送256个wei
    data: ''

}


var tx = new Tx(rawTx);
tx.sign(privateKey);
var serializedTx = tx.serialize();


web3.eth.sendRawTransaction('0x'+serializedTx.toString('hex'), function(err, hash) {
    if (!err)
        console.log(hash);
    else
        console.log(err);
});




/*
var _from = '0x3fd1f0507cd741e99dbad1eb65f7248c5333786d';
var number = web3.eth.getTransactionCount(_from).toString(16);

//var abi = require('ethereumjs-abi')
//var paramsData = abi.rawEncode("string", "sayHello").toString('hex');



var rawTx = {

    nonce: '0x'+number,
    gasPrice: '0x493e0',
    gasLimit: '0xc5c10',
    to:'0x628a6e69f3da96afe5406fb7743e98f4724b376b',
    data: '0xef5fb05bbc81b50769bf6c6e6f297aa4f4055ecc730b088789683d2026c63cfb'
}


console.log(` ========  第三步 部署合约  ==========  `);

var tx = new Tx(rawTx);
tx.sign(privateKey);
var serializedTx = tx.serialize();
//部署合约，并返回部署对象

web3.eth.sendRawTransaction('0x'+serializedTx.toString('hex'), function(err, hash) {
    if (!err)
        console.log(hash);
    else
        console.log(err);

});

*/
