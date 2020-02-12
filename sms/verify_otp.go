package sms

import (
	"fmt"
	// "log"
	"net/http"
	"io/ioutil"
	"encoding/json"
)

type Response_body struct {
	Message string `json:"message"` // Uppercased first letter
	Type string    `json:"type"`  // Uppercased first letter
}

func Verify_otp(phone_number string, otp string) bool{
	// This function verifies the OTP received on the phone number passed as parameter
	var res_body Response_body

	authentication_key := "317977AW4pGzw2Z5e43e504P1"

	url := "https://api.msg91.com/api/v5/otp/verify?mobile="+ phone_number +"&otp="+ otp +"&authkey=" + authentication_key
	// log.Println(url)

	req, _ := http.NewRequest("POST", url, nil)

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println("---------")
	
	// if err := c.BindJSON(res); err != nil {
	// 	c.AbortWithStatus(http.StatusBadRequest)
	// 	log.Print(err)
	// 	return
	// }

	err := json.Unmarshal(body, &res_body)
	if err != nil {
		panic(err)
	}

	fmt.Println(res_body.Message) // OTP verified success , Mobile no. already verified
	fmt.Println(res_body.Type) // success, error
	fmt.Println("---------")

	return res_body.Type == "success" || res_body.Message == "Mobile no. already verified"
}

// func main(){
// 	phone_number := "9810201131"
// 	otp := "4566"
// 	match := Verify_otp(phone_number, otp)

// 	fmt.Println(match)
// }