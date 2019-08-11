Feature: Cities API Call
Call API to get cities

Scenario: Making a GET request with id
  Given I have the endpoint "cities/2873891"
  When I make a GET request
  Then The response status code should be 200
  And The response property "name" should be "Mannheim"
  And The response property "country" should be "DE"

Scenario: Making a GET request with an invalid id
  Given I have the endpoint "cities/999999999"
  When I make a GET request
  Then The response status code should be 404
  And The response property "message" should be "not found"
  And The response property "code" should be "NotFoundError"

Scenario: Making a GET request with latitude and longitude
  Given I have the endpoint "cities?lat=49.48&lng=8.46"
  When I make a GET request
  Then The response status code should be 200
  And The response should be an array
  And The response should be not an empty array

Scenario: Making a GET request with missing parameters
  Given I have the endpoint "cities?lat=&lng="
  When I make a GET request
  Then The response status code should be 400
  And The response property "code" should be "BadRequestError"
  And The response property "message" should be "lat/lng required"
