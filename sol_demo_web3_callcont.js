/**
 * 测试合约的调用，调用合约的非交易，非写入方法
 *
 * @type {Ut}
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
var abi = JSON.parse(compileCode.contracts[':SimpleBank'].interface);

//console.info(compileCode);


(async () => {

    console.log(` ========  第五步 调用合约  ==========  `);
    const helloWorldContract = web3.eth.contract( abi );
    var helloWorldContractInstance = helloWorldContract.at('0x2a7a1a249a86a9f7ced0a7e27f88f1fea2141ddc');
    console.log ('=====  calling the contract locally ==========');
    console.log(helloWorldContractInstance.sayHello.call());

})()

