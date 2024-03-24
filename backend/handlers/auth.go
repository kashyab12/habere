package handlers

import (
	"github.com/gofiber/fiber/v3"
	"net/url"
)

type TTAuthorizeParams struct {
	ClientID     string
	Scope        string
	State        string
	RedirectURI  string
	ResponseType string
}

// GetTTAuthHandler requires client_id, scope, state, redirect_uri, and response_type
func (config *ApiConfig) GetTTAuthHandler(c fiber.Ctx) error {
	authorizeParams := TTAuthorizeParams{
		ClientID:     config.ClientID,
		Scope:        "tasks:write tasks:read",
		State:        "not-sure",
		RedirectURI:  "https://localhost:8922/ttAuthHook", // TODO: maybe make this a query param to fetch for this API via FE?
		ResponseType: "code",
	}
	const ttAuthorize = "https://ticktick.com/oauth/authorize"

	if authUrl, parseErr := url.Parse(ttAuthorize); parseErr != nil {
		return DefaultErrorHandler(c, parseErr)
	} else {
		queryParams := url.Values{}
		queryParams.Add("client_id", authorizeParams.ClientID)
		queryParams.Add("scope", authorizeParams.Scope)
		queryParams.Add("state", authorizeParams.State)
		queryParams.Add("redirect_uri", authorizeParams.RedirectURI)
		queryParams.Add("response_type", authorizeParams.ResponseType)
		authUrl.RawQuery = queryParams.Encode()
		return c.Redirect().Status(fiber.StatusOK).To(authUrl.String())
	}
}
