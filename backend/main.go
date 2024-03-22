package main

import (
	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
	"github.com/kashyab12/habere/handlers"
	"os"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		return
	}
	appRouter := chi.NewRouter()
	apiRouter := chi.NewRouter()
	apiConfig := handlers.ApiConfig{ClientID: os.Getenv("CLIENT_ID")}
	apiRouter.Get("/ttAuth", apiConfig.GetTTAuthHandler)
	appRouter.Mount("/api", apiRouter)
}
