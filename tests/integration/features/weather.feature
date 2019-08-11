Feature: API Call
Call API to get cities

Scenario: Making a GET request with id
  Given The city id 2873891
  When I make a GET request to "weather"
  Then The response status code should be 200
  And The response property "name" should be "Mannheim"

Scenario: Making a GET request with an invalid id
  Given The city id 999999999
  When I make a GET request to "weather"
  Then The response status code should be 404
  And The response property "message" should be "not found"
  And The response property "code" should be "NotFoundError"
