#!/usr/bin/env bash

read -p "Name: " name
read -p "Phone number: " roll
read -p "Gender (0/1): " gender
read -p "Email: " email
read -p "Password: " passHash

curl --request POST 'localhost:3000/admin/user/new' --header 'Content-Type: application/json' \
--data-raw "{'name': '$name', 'email': '$email', 'roll': '$roll', 'image': '', 'gender': '$gender', 'passHash': '$passHash'}"