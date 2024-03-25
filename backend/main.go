package main

import (
	"github.com/gorilla/sessions"
	"github.com/joho/godotenv"
	"github.com/kashyab12/habere/handlers"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"os"
)

func main() {
	if loadEnvErr := godotenv.Load(); loadEnvErr != nil {
		return
	}
	const FrontendUrl = "http://localhost:5173"

	app := echo.New()
	apiConfig := handlers.ApiConfig{ClientID: os.Getenv("TT_CLIENT_ID"), ClientSecret: os.Getenv("TT_CLIENT_SECRET")}
	app.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{FrontendUrl},
		AllowCredentials: true,
	}))
	app.Use(middleware.Logger())
	app.Use(session.Middleware(sessions.NewCookieStore([]byte(os.Getenv("SESSION_STORE_SECRET")))))
	app.GET("/ttScopeVerify", apiConfig.GetTTScopeVerification)
	app.Any("/ttAuth", apiConfig.GetTTAuthorize)
	app.Logger.Fatal(app.Start(":8080"))
}
