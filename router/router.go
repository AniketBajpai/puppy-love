package router

import (
	"net/http"

	"github.com/AniketBajpai/puppy-love/controllers"
	"github.com/AniketBajpai/puppy-love/db"

	"github.com/gin-gonic/gin"
)

func PuppyRoute(r *gin.Engine, db db.PuppyDb) {

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusAccepted, "Hello from the other side!")
	})

	controllers.Db = db

	r.GET("/stats", controllers.GetStats)

	// User administration
	users := r.Group("/users")
	{
		users.POST("/login/first", controllers.UserFirst)
		users.POST("/data/update/:you", controllers.UserUpdateData)
		users.POST("/data/submit/:you", controllers.UserSubmitTrue)
		users.POST("/image/update/:you", controllers.UserUpdateImage)
		users.POST("/pass/update/:you", controllers.UserSavePass)

		users.GET("/data/info", controllers.UserLoginGet)
		users.GET("/data/match/:you", controllers.MatchGet)
		users.GET("/get/:id", controllers.UserGet)
		users.GET("/mail/:id", controllers.UserMail)
		users.GET("/otp/:phone", controllers.OTPGenerate)
	}
	api_users := r.Group("/api/users")
	{
		api_users.POST("/login/first", controllers.UserFirst)
		api_users.POST("/data/update/:you", controllers.UserUpdateData)
		api_users.POST("/data/submit/:you", controllers.UserSubmitTrue)
		api_users.POST("/image/update/:you", controllers.UserUpdateImage)
		api_users.POST("/pass/update/:you", controllers.UserSavePass)
		
		api_users.GET("/data/info", controllers.UserLoginGet)
		api_users.GET("/data/match/:you", controllers.MatchGet)
		api_users.GET("/get/:id", controllers.UserGet)
		api_users.GET("/mail/:id", controllers.UserMail)
		api_users.GET("/otp/:phone", controllers.OTPGenerate)
	}

	// Listing users
	list := r.Group("/list")
	{
		list.GET("/all", controllers.ListAll)
		list.GET("/pubkey", controllers.PubkeyList)
		list.GET("/declare", controllers.DeclareList)
	}
	api_list := r.Group("/api/list")
		{
			api_list.GET("/all", controllers.ListAll)
			api_list.GET("/pubkey", controllers.PubkeyList)
			api_list.GET("/declare", controllers.DeclareList)
		}

	// Hearts
	hearts := r.Group("/hearts")
	{
		hearts.GET("/get/:time/:you", controllers.HeartGet)
	}
	api_hearts := r.Group("/api/hearts")
	{
		api_hearts.GET("/get/:time/:you", controllers.HeartGet)
	}

	// Session administration
	session := r.Group("/session")
	{
		session.POST("/login", controllers.SessionLogin)
		session.GET("/logout", controllers.SessionLogout)
	}
	api_session := r.Group("/api/session")
	{
		api_session.POST("/login", controllers.SessionLogin)
		api_session.GET("/logout", controllers.SessionLogout)
	}

	// Admin
	admin := r.Group("/admin")
	{
		admin.GET("/declare/prepare", controllers.DeclarePrepare)
		admin.GET("/user/drop", controllers.UserDelete)
		admin.POST("/user/new", controllers.UserNew)
	}
	api_admin := r.Group("/api/admin")
	{
		api_admin.GET("/declare/prepare", controllers.DeclarePrepare)
		api_admin.GET("/user/drop", controllers.UserDelete)
		api_admin.POST("/user/new", controllers.UserNew)
	}

	api_message := r.Group("/api/message")
	{
		api_message.GET("/heart/:phone", controllers.HeartMessageShare)
	}

}
