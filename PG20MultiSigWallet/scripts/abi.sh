#!/bin/sh

cd `dirname $0`
cat ../build/contracts/PG20MultiSigWallet.json | jq -c .abi