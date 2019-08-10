Feature: API Call
Call API to get cities

Scenario: Making a GET request with id
  Given The city id 2873891
  When I make a GET request to "cities"
  Then The response property "name" should be "Mannheim"
  And The response property "country" should be "DE"

Scenario: Making a GET request with latitude and longitude
  Given The latitude 49.48 and longitude 8.46
  When I make a GET request to "cities"
  Then The response should be an array
  And The response should be not an empty array
