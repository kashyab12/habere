package handlers

import (
	"encoding/gob"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
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
		ttAuthURL    = "https://ticktick.com/oauth/authorize"
		ttTokenURL   = "https://ticktick.com/oauth/token"
		redirectURL  = "http://localhost:8080/ttAuth"
		DayInSeconds = 86400
	)
	authSession, _ := session.Get("tt-authentication", c)
	authSession.Options = &sessions.Options{
		MaxAge:   DayInSeconds,
		HttpOnly: true,
	}
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
	gob.Register(oauth2.Config{})
	authSession.Values["oauth2Config"] = *authConf
	authSession.Values["verifier"] = verifier
	authSession.Values["frontendURL"] = c.Response().Header().Get("Origin")
	saveErr := authSession.Save(c.Request(), c.Response())
	if saveErr != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": "Could not save the session cookie to the response.",
		})
	}
	return c.JSON(http.StatusOK, echo.Map{
		"url": scopeVerifyURL,
	})
}

func (config *ApiConfig) GetTTAuthorize(c echo.Context) error {
	authorizationCode := c.QueryParam("code")
	state := c.QueryParam("state")
	authSession, _ := session.Get("tt-authentication", c)
	if authConfIf, isAuthConfExists := authSession.Values["oauth2Config"]; !isAuthConfExists {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": "session store lost",
		})
	} else if authConf, isCastedToConfErr := authConfIf.(oauth2.Config); !isCastedToConfErr {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": "could not cast session store to oauth2 config",
		})
	} else if authVerifierInf, isVerifier := authSession.Values["verifier"]; !isVerifier {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": "session verifier not found",
		})
	} else if authVerifier, isCastedToStr := authVerifierInf.(string); !isCastedToStr {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": "could not cast verifier to string",
		})
	} else if token, tokenError := authConf.Exchange(c.Request().Context(), authorizationCode, oauth2.VerifierOption(authVerifier)); tokenError != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": tokenError.Error(),
		})
	} else if frontendURLIf, isURLExists := authSession.Values["frontendURL"]; !isURLExists {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": "could not find frontend url",
		})
	} else if _, isCastedURLToStr := frontendURLIf.(string); !isCastedURLToStr {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": "could not frontendURL var to string",
		})
	} else {
		gob.Register(oauth2.Token{})
		authSession.Values["token"] = *token
		authSession.Values["state"] = state
		saveErr := authSession.Save(c.Request(), c.Response())
		if saveErr != nil {
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"error": "Could not save the session cookie to the response.",
			})
		} else {
			return c.NoContent(http.StatusOK)
		}
	}
}
