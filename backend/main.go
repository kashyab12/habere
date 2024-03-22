package main

import (
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/gofiber/fiber/v3/middleware/recover"
	"github.com/joho/godotenv"
	"github.com/kashyab12/habere/handlers"
	"os"
)

func main() {
	if loadEnvErr := godotenv.Load(); loadEnvErr != nil {
		return
	}
	apiConfig := handlers.ApiConfig{ClientID: os.Getenv("CLIENT_ID")}
	app := fiber.New()
	app.Use(cors.New())
	app.Use(recover.New())
	app.Get("/ttAuth", apiConfig.GetTTAuthHandler)
	if listenError := app.Listen(":8992"); listenError != nil {
		return
	}
}
