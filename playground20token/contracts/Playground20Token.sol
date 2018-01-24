pragma solidity ^0.4.19;

import "zeppelin-solidity/contracts/token/MintableToken.sol";

contract Playground20Token is MintableToken {

    string const public name = "Playground20Token";   // トークンの名称
    string public symbol = "PG20";                    // トークンのシンボル
    uint8 public decimals = 18;                       // トークンの小数点以下の桁数

    // コンストラクタ
    // このコンストラクタでは何もせずに、
    // トークンを初期化する親のスマートコントラクトで、トークンの初期発行等を行う。
    function Playground20Token() {
    }

}
