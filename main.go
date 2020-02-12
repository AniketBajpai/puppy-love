package main

import (
	"fmt"
	"os"

	"github.com/AniketBajpai/puppy-love/config"
	"github.com/AniketBajpai/puppy-love/db"
	"github.com/AniketBajpai/puppy-love/router"
	"github.com/AniketBajpai/puppy-love/utils"

	// "github.com/gorilla/sessions"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

func executeFirst(c *gin.Context) {
	// fmt.Println(string(ctx.Path()[:]))
	// ctx.Next()
}

func main() {
	config.CfgInit()

	mongoDb, error := db.MongoConnect()
	if error != nil {
		fmt.Print("[Error] Could not connect to MongoDB")
		fmt.Print("[Error] " + config.CfgMgoUrl)
		fmt.Print(os.Environ())
		os.Exit(1)
	}

	utils.Randinit()

	// set up session db
	store := cookie.NewStore([]byte(config.CfgAdminPass))

	// iris.Config.Gzip = true
	r := gin.Default()
	r.Use(sessions.Sessions("mysession", store))
	router.PuppyRoute(r, mongoDb)
	r.Run(config.CfgAddr)
}
