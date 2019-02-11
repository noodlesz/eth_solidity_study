/**
 *  利用web3，通过私钥签名部署contract
 *
 * @type {Ut}
 */

var Web3 = require('web3');
//http://localhost:7545 为Ganache提供的节点链接
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

console.log(` ========  第一步 读取合约  ==========  `);
//读取合约
var fs = require('fs');
var contractCode = fs.readFileSync('/project/ws_nodejs/eth/solidity/sol_demo.sol').toString();

console.log(` ========  第二步 编译合约  ==========  `);
//编译合约代码
var solc = require('solc');
var compileCode = solc.compile(contractCode);

//console.info(compileCode)


var abi = JSON.parse(compileCode.contracts[':SimpleBank'].interface);
var byteCode = compileCode.contracts[':SimpleBank'].bytecode;
var accountaddress = web3.eth.accounts[0];
var VotingContract = web3.eth.contract(abi);



var Tx = require('ethereumjs-tx');
var privateKey = new Buffer('709211b14d391b50edd06c2544d81f5a77b4cc0668746569de5548c86a00bb28', 'hex')

var _from = '0x9b511ccd1457b72380b817ffa2fd13a0f4b14bc7';
var number = web3.eth.getTransactionCount(_from).toString(16);


var  gasPriceValue = '493e0';
var  gasLimitValue = 'c5c10';

/*

gasPrice: '0x493e0',
gasLimit: '0xc5c10',

var  gasPriceValue = '493e0';
var  gasLimitValue = 'c5c10';

*/

var rawTx = {
    nonce: '0x'+number,
    gasPrice: '0x'+gasPriceValue,
    gasLimit: '0x'+gasLimitValue,
    data: '0x'+byteCode
}


console.log(` ========  第三步 部署合约  ==========  `);

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
