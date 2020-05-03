

# gps_api
adress:port(default: 8080)/gps/
params: long, lat
longitude / latitude, format : DD
return: `200 + Template or 'no result' / 400 + Missing or wrong parameter`
```
Template: {
	adress: {
		name (string),
		country (string),
		city (string),
		houseNumber (string),
		postalCode (string),
	},
	contact: {
		email (optional, string),
		phone (optional, string),
		website (optional, string),
	}
	opening_time (string),
	distance (meters - int),
}
```
# HERE api

Every fields below "distance" aren't always filled

```received data:
{
	title (string),
	id (string),
	resultType (string),
	address {
		label (string),
		countryCode (string),
		countryName (string),
		state (string),
		county (string),
		city (string),
		street (string),
		postalCode (int),
		houseNumber (int),
	},
	position {
		lat (float),
		lng (float),
	},
	access {
		lat (float),
		lgn (float),
	},
	distance (int - meters),
	categories [
		id (int-int-int)
	],
	foodTypes: [
		id (int-int-int)
	],
	contacts: [{
		phone: [{
			value (string)
		}]
		www: [{
			value (string)
		}]
		email: [{
			value (string)
		}]
		fax: [{
			value (string)
		}]
	}],
	opening_hours: [{
		text: [
			(string)
		]
	isOpen (boolean),
	structured [{
		start: (string),
		duration: (string)
		recurence: (string)
		}]
	}]
}
```
# docker-compose

.env variable :

 - application port (PORT)
  - response max size (RESPONSE_MAXSIZE)
  - language (LANG)
  - max search distance (DISTANCE)
  - search result type (TYPE)
  - api url (APIURL)
  - api key (APIKEY)

