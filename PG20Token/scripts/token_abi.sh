#!/bin/sh

cd `dirname $0`
cat ../build/contracts/PG20Token.json | jq -c .abi