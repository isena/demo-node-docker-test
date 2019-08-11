Feature: Weather API Call
Call API to get weather

Scenario: Making a GET request with id
  Given I have the endpoint "cities/2873891/weather"
  When I make a GET request
  Then The response status code should be 200
  And The response property "name" should be "Mannheim"

Scenario: Making a GET request with an invalid id
  Given I have the endpoint "cities/999999999/weather"
  When I make a GET request
  Then The response status code should be 404
  And The response property "message" should be "not found"
  And The response property "code" should be "NotFoundError"
