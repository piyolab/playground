#!/bin/sh

cd `dirname $0`
cat ../build/contracts/Playground20TokenGenerator.json | jq -c .abi