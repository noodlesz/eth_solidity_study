/**
 *
 * 利用web3，通过私钥签名调用合约，主要用于交易发送类的方法，这种调用方式一般就不会返回值，直接返回交易的哈希值
 *
 * @type {Ut}
 *
 */

let Ut = require("./sleep");

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

console.info(compileCode)




var abi = JSON.parse(compileCode.contracts[':SimpleBank'].interface);
var byteCode = compileCode.contracts[':SimpleBank'].bytecode;
var accountaddress = web3.eth.accounts[0];
var VotingContract = web3.eth.contract(abi);



var Tx = require('ethereumjs-tx');
var privateKey = new Buffer('d46571d6109ed2be7c459e976b4de1ae28896fcfe63f70ab26cef8853bd0d398', 'hex')


/*var rawTx = {
    nonce: '0x00',
    gasPrice: '0x09184e72a000',
    gasLimit: '0x2710',
    data: '0x'+byteCode
}


console.log(` ========  第三步 部署合约  ==========  `);

var tx = new Tx(rawTx);
tx.sign(privateKey);
var serializedTx = '0x'+tx.serialize();
//部署合约，并返回部署对象

web3.eth.sendRawTransaction(serializedTx.toString('hex'), function(err, hash) {
    if (!err)
        console.log(hash);
    else
        console.log(err);
    // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
});*/

var _from = '0xb0be1182ed926fd67385aad1b6e97622422b5386';
var number = web3.eth.getTransactionCount(_from).toString(16);

//var abi = require('ethereumjs-abi')
//var paramsData = abi.rawEncode("string", "sayHello").toString('hex');

//web3.sha3("sayHello()")

var rawTx = {

    nonce: '0x'+number,
    gasPrice: '0x493e0',
    gasLimit: '0xc5c10',
    to:'0x2eace0ec499fd5e768aa7d05663841db2fd15b34',
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

