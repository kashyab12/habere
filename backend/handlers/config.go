package handlers

import "net/http"

type ApiConfig struct {
	ClientID     string
	ClientSecret string
	HttpClient   *http.Client
}
