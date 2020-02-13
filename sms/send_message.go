package sms
// package main

import (
	"fmt"
	// "log"
	// "bytes"
	"strings"
	"net/http"
	"io/ioutil"
	// "encoding/json"
)


func SendHeartMessage(phoneNumbers []string, message string) {
	url := "https://api.msg91.com/api/v2/sendsms"

	for _, phone := range phoneNumbers {
		str1 := "{ \"sender\": \"PLAYMT\", \"route\": \"4\", \"country\": \"91\",\"sms\": [ { \"message\": \""
		str2 := message
		str3 := "\", \"to\": [ \""
		str4 := phone
		str5 := "\" ] } ] }"
		str6 := str1 + str2 + str3 + str4 + str5
		buffer := strings.NewReader(str6) 

		fmt.Println(buffer)

		req, _ := http.NewRequest("POST", url, buffer)

		req.Header.Add("authkey", "317977AW4pGzw2Z5e43e504P1")
		req.Header.Add("content-type", "application/json")

		res, _ := http.DefaultClient.Do(req)

		defer res.Body.Close()
		body, _ := ioutil.ReadAll(res.Body)

		fmt.Println(res)
		fmt.Println(string(body))
	}
}

// func main(){
// 	var phoneNumbers []string
// 	phoneNumbers = append(phoneNumbers, "8800156160")
// 	message := "Someone has liked you in your campus. You have a secret admirer! Send your likes anonomously by visiting playmates.me and see if you match this Valentine's Day"	// URL encoded
// 	// var match bool
// 	sendHeartMessage(phoneNumbers, message)

// 	// fmt.Println(match)
// }