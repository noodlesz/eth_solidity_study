/**
 * 由于ETH  智能合约的运行部署比较麻烦，需要的步骤比较多，有时候由于以太坊本身的特性导致学习的效率比较，为了提高效率
 * 编写了该脚本通过该脚本，实现类似java等编程语言所见及所得的学习效果。当修改智能合约源代码之后，可以快速检查修改后的结果。
 * 本脚本一步完成合约的编译、部署、安装和调用，在testrpc 、 ganache-cli等环境中能够快速响应，是学习和开发合约过程中的好工具。
 *
 * 本例配合ganache-cli使用效果更好
 *
 *
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

console.info(compileCode);


(async () => {


    var abi = JSON.parse(compileCode.contracts[':SimpleBank'].interface);
    var byteCode = compileCode.contracts[':SimpleBank'].bytecode;
    var accountaddress = web3.eth.accounts[0];
    var VotingContract = web3.eth.contract(abi);


    console.log(` ========  第三步 部署合约  ==========  `);

    //部署合约，并返回部署对象
    var deployedContract = VotingContract.new({
        data:"0x"+byteCode,
        from:accountaddress,  //部署合约的外部账户地址
        gas:750000        //部署合约的矿工费
    });


    var transactionHash = deployedContract['transactionHash']
    console.log(transactionHash);

    console.log(` ========  第四步 等待合约完成  ==========  `);

    // 如果在 ganache-cli  等模拟测试环境中使用，效果更好。
    //await Ut.sleep(30000)

    var contractAddressArr = web3.eth.getTransactionReceipt(transactionHash);
    console.log(contractAddressArr);
    var contractAddress =  contractAddressArr['contractAddress']

    console.log(contractAddress);


    console.log(` ========  第五步 调用合约  ==========  `);
    const helloWorldContract = web3.eth.contract( abi );
    var helloWorldContractInstance = helloWorldContract.at(contractAddress);
    console.log ('=====  calling the contract locally ==========');
    console.log(helloWorldContractInstance.sayHello.call());





})()

