package controllers

import (
	// "log"
	"net/http"
	// "strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/AniketBajpai/puppy-love/sms"

	"gopkg.in/mgo.v2/bson"
)

func HeartGet(c *gin.Context) {
	id, err := SessionId(c)
	if err != nil || id != c.Param("you") {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	// // Last checked time
	// ltime, err := strconv.ParseUint(c.Param("time"), 10, 64)
	// if err != nil {
	// 	c.String(http.StatusBadRequest, "Bad timestamp value")
	// 	return
	// }

	// Current time
	ctime := uint64(time.Now().UnixNano() / 1000000)

	// TODO: fix bindings to be consistent across dbs
	type AnonymVote struct {
		Value          string `json:"v" bson:"v"`
		GenderOfSender string `json:"genderOfSender" bson:"gender"`
	}

	var votes = []AnonymVote { 
		AnonymVote {
			Value: "1", 
			GenderOfSender: "0",
		},
	}

	// // Fetch user
	// if err := Db.GetCollection("heart").
	// 	Find(bson.M{"time": bson.M{"$gt": ltime, "$lte": ctime}}).
	// 	All(votes); err != nil {
	// 	c.AbortWithStatus(http.StatusNotFound)
	// 	log.Print(err)
	// 	return
	// }

	// if *votes == nil {
	// 	*votes = []AnonymVote{}
	// }

	c.JSON(http.StatusAccepted, bson.M{
		"votes": votes,
		"time":  ctime,
	})
}

func HeartMessageShare(c *gin.Context) {
	phone := c.Param("phone")
	heartMessage := "You have a secret admirer on your campus! Send your likes anonomously by visiting playmates.me and see if there is a mutual spark this Valentine's Day!";

	var phoneNumber []string;
	phoneNumber = append(phoneNumber, phone)
	sms.SendHeartMessage(phoneNumber, heartMessage);
	c.String(http.StatusOK, "Message sent successfully!")
}