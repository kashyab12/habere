package handlers

import (
	"encoding/json"
	"net/http"
)

func JSONResponder(w http.ResponseWriter, responseCode int, responseObj any) error {
	if encodedResponseObj, encodingErr := json.Marshal(responseObj); encodingErr != nil {
		return encodingErr
	} else {
		w.WriteHeader(responseCode)
		w.Header().Set("Content-Type", "application/json")
		if _, writeErr := w.Write(encodedResponseObj); writeErr != nil {
			return writeErr
		}
	}
	return nil
}

func ErrorResponder(w http.ResponseWriter, errorCode int, message string) error {
	errorStruct := struct {
		Error string `json:"error"`
	}{Error: message}
	return JSONResponder(w, errorCode, &errorStruct)
}
