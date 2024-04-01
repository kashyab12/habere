package handlers

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"net/http"
)

func (config *ApiConfig) GetTodaysTasksTT(c echo.Context) error {

	if authHeader := c.Request().Header.Get("Authorization"); authHeader == "" {
		return c.NoContent(http.StatusUnauthorized)
	} else {
		const (
			GetAllProjectsAPI = "https://api.ticktick.com/open/v1/project"
		)
		if allProjectsReq, fetchProjectErr := http.NewRequest("GET", GetAllProjectsAPI, nil); fetchProjectErr != nil {
			allProjectsReq.Header.Set("Authorization", authHeader)
			if projectsResponse, projectsResponseErr := config.HttpClient.Do(allProjectsReq); projectsResponseErr != nil {
				fmt.Println(projectsResponse)
				return nil
			} else {
				return nil
			}
		} else {
			return c.NoContent(http.StatusInternalServerError)
		}
	}
}
