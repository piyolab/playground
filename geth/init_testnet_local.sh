#!/bin/sh

mkdir -p $HOME/ethereum/testnet_local
cd `dirname $0`
cp genesis.json $HOME/ethereum/testnet_local/
geth --dev --datadir $HOME/ethereum/testnet_local/data init $HOME/ethereum/testnet_local/genesis.json
