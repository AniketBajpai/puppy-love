#!/usr/bin/env bash

echo "Username: ${1}"
VAL=$(curl --request POST 'localhost:3000/session/login' --header 'Content-Type: application/json' --data-raw '{"username":"admin", "password": "passhash"}' | tail -n 2 | head -n1)
echo "Cookie is ${VAL}"

if [ "$1" = "admin" ];
then
    echo "Logging in as admin"
    export CADMIN="Cookie:${VAL:12}"
else
    echo "Logging in as ${1}"
    export COOKIE="Cookie:${VAL:12}"
fi;
