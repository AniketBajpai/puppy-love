package main

import (
	"os"
)

var CfgMgoUrl = "mongodb://0.0.0.0:27017/puppy"

func CfgInit() {
	var port string
	var addr string

	// Mongo ENV variables
	port = os.Getenv("MONGO_PORT_27017_TCP_PORT")
	addr = os.Getenv("MONGO_PORT_27017_TCP_ADDR")
	if port != "" && addr != "" {
		CfgMgoUrl = "mongodb://" + addr + ":" + port + "/puppy"
	}
}
