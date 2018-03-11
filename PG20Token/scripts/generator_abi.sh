#!/bin/sh

cd `dirname $0`
cat ../build/contracts/PG20TokenGenerator.json | jq -c .abi