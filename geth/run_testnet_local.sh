#!/bin/sh

geth --datadir $HOME/ethereum/testnet_local/data --networkid 8888 --rpc --rpccorsdomain "*" --rpcport 8888 --nodiscover --maxpeers 0 console 2>> $HOME/ethereum/testnet_local/data/geth.log