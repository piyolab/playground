#!/bin/sh

cd `dirname $0`
cat ../build/contracts/Playground20Token.json | jq -c .abi