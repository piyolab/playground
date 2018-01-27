pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import './Playground20Token.sol';

contract Playground20TokenGenerator {
	
	using SafeMath for uint256;

	// 発行するトークン
	Playground20Token public token;

	// Ether とトークンの交換レート
	uint256 internal constant rate = 1000;

	// トークン発行数のキャップ: 2100万
	uint256 public constant cap = 21000000 * (10**18); 

	// トークン発行時に送付された Ether を受け取る wallet
	address internal constant wallet = 0xac82f34a1a287B2206982A9220e7b68846C645dF;
	
 	event TokenPurchase(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);

	// コンストラクタ
	function Playground20TokenGenerator() public {
		token = new Playground20Token();
	}

	// フォールバック関数
	// このコントラクトに Ether が送付されたときに呼ばれる
	function () external payable {
		buyTokens(msg.sender);
	}

	// トークンを購入するメソッド
	function buyTokens(address beneficiary) public payable {
		require(beneficiary != address(0));
		require(msg.value != 0);
	    uint256 weiAmount = msg.value;
	    // 発行するトークンの量を計算
        uint256 tokenAmount = weiAmount.mul(rate) + getBonus();
        // 現在のトークン供給量 + 今回発行するトークン量がcapを上回らないかチェック
        if (tokenAmount.add(token.totalSupply()) > cap) {
        	revert();
        } else {
	        token.mint(beneficiary, tokenAmount);
	        TokenPurchase(msg.sender, beneficiary, weiAmount, tokenAmount);
	        wallet.transfer(msg.value);        	
        } 
	}

	// 現在のボーナスを取得するメソッド
	function getBonus() public view returns (uint256) {
		// 1577804400 = 2020/01/01 00:00:
		uint256 bonusLastTime = 1577804400;
		if (block.timestamp >= bonusLastTime) {
			return 0;
		}
		return bonusLastTime.sub(block.timestamp) * (10**15);
	}

}