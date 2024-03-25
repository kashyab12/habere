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

// GetTTScopeVerification requires client_id, scope, state, redirect_uri, and response_type
func (config *ApiConfig) GetTTScopeVerification(c echo.Context) error {
	const (
		ttAuthURL   = "https://ticktick.com/oauth/authorize"
		ttTokenURL  = "https://ticktick.com/oauth/token"
		redirectURL = "http://localhost:8080/ttAuth"
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
	scopeVerifyURL := authConf.AuthCodeURL("state", oauth2.AccessTypeOffline, oauth2.S256ChallengeOption(verifier))
	return c.JSON(http.StatusOK, echo.Map{
		"url": scopeVerifyURL,
	})
}

func (config *ApiConfig) GetTTAuthorize(c echo.Context) error {
	authorizationCode := c.QueryParam("code")
	state := c.QueryParam("state")
	return c.JSON(http.StatusOK, echo.Map{
		"authCode": authorizationCode,
		"state":    state,
	})
}
