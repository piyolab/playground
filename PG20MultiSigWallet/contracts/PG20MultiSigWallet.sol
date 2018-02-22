pragma solidity ^0.4.13;

import './lib/MultiSigWallet.sol';

contract PG20MultiSigWallet is MultiSigWallet {

  function PG20MultiSigWallet(address[] _owners, uint _required)
  public
  validRequirement(_owners.length, _required)
  MultiSigWallet(_owners, _required)
  {
  }
}