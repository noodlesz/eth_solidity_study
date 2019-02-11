pragma solidity ^0.4.10;

/*
contract 关键字和其他面向对象语言的class关键字是类似的，contract可以继承，实现接口，抽象接口。
*/
contract SimpleBank { // 驼峰命名法

    //在函数外部定义的状态变量的生命周期和合约的生命周期是一样的。

    // mapping 是一个字典类型，在这里我们定义了账户到余额的一个映射。
    //"private" 仅仅阻止了其它合约来进行访问和修改
    //但所有区块链中的数据对外部依然是可见的
    mapping (address => uint) private balances;

    /*
    'public' 使编译器为所有的public的状态变量自动创建访问函数，
    访问函数有外部(external)可见性。
    如果通过内部(internal)的方式访问，比如直接访问，你可以直接把它当一个变量进行使用，
    但如果使用外部(external)的方式来访问，如通过 'this.' ，那么它必须通过函数的方式来调用。
    */

    address public owner;


    // Events - 向外部监听者发布消息
    event LogDepositMade(address accountAddress, uint amount);


    //构造函数，可以接受一个或多个参数，只能有一个构造函数不可以重载。构造函数和合约名字相同
    function SimpleBank() {
        // msg 提供发送给合约消息的详细信息
        // msg.sender 是合约调用者（合约创建者的地址）
        owner = msg.sender;
    }

    /// @notice 向银行存储以太币
    /// @return 返回用户的余额
    function deposit() payable public returns (uint) {
        balances[msg.sender] += msg.value;

        LogDepositMade(msg.sender, msg.value); // 发送事件

        return balances[msg.sender];
    }

    /// @notice 从银行中取回以太币
    /// @param withdrawAmount 希望取回的以太币数量
    /// @return 返回用户剩余以太币的数量
    function withdraw(uint withdrawAmount) public returns (uint remainingBal) {
        if(balances[msg.sender] >= withdrawAmount) {

            balances[msg.sender] -= withdrawAmount;

            if (!msg.sender.send(withdrawAmount)) {
                //如果转账失败，返回之前的以太币
                balances[msg.sender] += withdrawAmount;
            }
        }

        return balances[msg.sender];
    }

    /// @notice 获取余额
    /// @return 返回用户的余额
    // 'constant' 函数被声明为常量，这类函数将承诺自己不修改区块链上任何状态。
    function balance() constant returns (uint) {
        return balances[msg.sender];
    }

}
// ** END EXAMPLE **