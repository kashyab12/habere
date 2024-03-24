package handlers

import (
	"github.com/labstack/echo/v4"
	"golang.org/x/oauth2"
	"net/http"
)

type TTAuthorizeParams struct {
	ClientID     string
	Scope        string
	State        string
	RedirectURI  string
	ResponseType string
}

// GetTTAuthHandler requires client_id, scope, state, redirect_uri, and response_type
func (config *ApiConfig) GetTTAuthHandler(c echo.Context) error {
	const (
		ttAuthURL   = "https://ticktick.com/oauth/authorize"
		ttTokenURL  = "https://ticktick.com/oauth/token"
		redirectURL = "http://localhost:5173"
	)
	authConf := &oauth2.Config{
		ClientID:     config.ClientID,
		ClientSecret: config.ClientSecret,
		Endpoint: oauth2.Endpoint{
			AuthURL:  ttAuthURL,
			TokenURL: ttTokenURL,
		},
		RedirectURL: redirectURL,
		Scopes:      []string{"tasks:write", "tasks:read"},
	}
	verifier := oauth2.GenerateVerifier()
	url := authConf.AuthCodeURL("state", oauth2.AccessTypeOffline, oauth2.S256ChallengeOption(verifier))
	return c.Redirect(http.StatusOK, url)
}
