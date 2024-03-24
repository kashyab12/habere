package main

import (
	"github.com/joho/godotenv"
	"github.com/kashyab12/habere/handlers"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"os"
)

func main() {
	if loadEnvErr := godotenv.Load(); loadEnvErr != nil {
		return
	}
	apiConfig := handlers.ApiConfig{ClientID: os.Getenv("TT_CLIENT_ID"), ClientSecret: os.Getenv("TT_CLIENT_SECRET")}
	app := echo.New()
	app.Use(middleware.CORS())
	app.Use(middleware.Logger())
	app.GET("/ttScopeVerify", apiConfig.GetTTScopeVerification)
	app.Any("/ttAuth", apiConfig.GetTTAuthorize)
	app.Logger.Fatal(app.Start(":8080"))
}
