package sms

import (
	"fmt"
	"net/http"
	"io/ioutil"
)

func Send_otp(phone_number string){
	// This function sends an OTP to the phone number passed as parameter

	authentication_key := "317977AW4pGzw2Z5e43e504P1"
	template_id := "5e440a9bd6fc051055075e46" // sample_template specified on MSG91 website

	url := "https://api.msg91.com/api/v5/otp?authkey=" + authentication_key + "&template_id=" + template_id + "&extra_param=%7B%22Param1%22%3A%22Value1%22%2C%20%22Param2%22%3A%22Value2%22%2C%20%22Param3%22%3A%20%22Value3%22%7D&mobile=" + phone_number

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("content-type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))
	return 
}

// func main() {

// 	phone_number := "9810201131"
// 	Send_otp(phone_number)

// }