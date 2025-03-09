package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"github.com/LokeshVrma/CampusJunction/server/config"
)

func main()  {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading env file")
	}

	db.ConnectDatabase()

	port := os.Getenv("PORT")

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge: 10 * time.Second,	// Short cache for development
	}))

	publicRoutes := r.Group("/api")

	publicRoutes.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "server is up and running"})
	})

	r.Run("127.0.0.1:" + port)
}