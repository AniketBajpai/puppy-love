package sms

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://api.msg91.com/api/v2/sendsms"

	payload := strings.NewReader("{ \"sender\": \"SOCKET\", \"route\": \"4\", \"country\": \"91\", \"sms\": [ { \"message\": \"Message1\", \"to\": [ \"9717253064\" ] } ] }")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("authkey", "317977AW4pGzw2Z5e43e504P1")
	req.Header.Add("content-type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}