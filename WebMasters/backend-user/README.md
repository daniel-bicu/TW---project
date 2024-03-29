# Authorization documentation

## /api/records/

The documentation is addressed to the administrative staff of the website.

The aim of this route is to admnistrate the website. It has all the operations over the
accidents from the database

(`C`-creation, `R`- read, `U` - update, `D` - delete ).

In order to use this route you need an authorization token which can be obtained after
registration is done successfuly at route: `POST $HOST/api/users`. The registration part
needs a `body` part for the POST request which should be completed with the credentials
for the account: email and password (don't worry about the password, it will be encrypted
before it will be stored in database.)

e.g. :

```json
{
	"email": "user.name@gmail.com",
	"password": "poo92321L;;"
}
```

The response will be an JSON with data you've completed (without password), in addition to
this you will get an ID and an authorization token (JWT-JsonWebToken).

e.g. (response) :

```json
{
	"success": true,
	"data": {
		"user": {
			"_id": "5ee2089c06579041c2d6b5c2",
			"email": "user.name@gmail.com",
			"__v": 1
		},
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWUyMDg5YzA2NTc5MDQxYzJkNmI1YzIiLCJpYXQiOjE1OTE4NzE2NDR9.0ic0r0-lOOPD-s8Fg8Uo2u7fTG65U-rwjFAYUCPZnWo"
	}
}
```

### Headers

Bearer authorization token for administration things like adding accidents/ getting
accidents/ update accidents or delete accidents.

eg.: token value=
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWJkYTc0OWRmYmM2ZTczYmM0N2ZiZWUiLCJpYXQiOjE1ODk0ODc0MzN9.eyP0Q8mjIPC5Z01UR687ynhgQRZma2mKw5abVJe3zPI`

### GET

Aim: get an accident by its unique id. This route responds with all details about an
accident from database.

#### Request format

`GET $HOST/api/records/:id`

#### Request example

`GET $HOST/api/records/5ebc1a6df33a7c7f3c21d135`

The encoded string represents an id of an accidents. It must be valid for getting the
result you're expecting.

#### Response example

```json
{
	"success": true,
	"data": {
		"accident": {
			"_id": "5ebc1a6df33a7c7f3c21d135",
			"source": "MapQuest",
			"tmc": 201,
			"severity": 3,
			"startTime": "2016-02-08T07:44:26.000Z",
			"endTime": "2016-02-08T08:14:26.000Z",
			"startLat": 40.10059,
			"startLng": -82.925194,
			"distance": 0.01,
			"desc": "Accident on I-270 Outerbelt Northbound near Exit 29 OH-3 State St. Expect delays.",
			"street": "Westerville Rd",
			"side": "R",
			"city": "Westerville",
			"county": "Franklin",
			"state": "OH",
			"zipCode": "43081",
			"timezone": "US/Eastern",
			"airportCode": "KCMH",
			"weatherTimestamp": "2016-02-08T07:51:00.000Z",
			"temperature": 37.9,
			"windChill": 35.5,
			"humidity": 97,
			"pressure": 29.63,
			"visibility": 7,
			"windDirection": "SSW",
			"windSpeed": 3.5,
			"precipitation": 0.03,
			"weatherCondition": "Light Rain",
			"amenity": false,
			"bump": false,
			"crossing": false,
			"giveWay": false,
			"junction": false,
			"noExit": false,
			"railway": false,
			"roundabout": false,
			"station": false,
			"stop": false,
			"trafficCalming": false,
			"trafficSignal": false,
			"turningLoop": false,
			"sunriseSunsetNight": false,
			"civilTwilightNight": false,
			"nauticalTwilightNight": false,
			"astronomicalTwilightNight": false
		}
	}
}
```

### POST

Aim: add an accident in the database. In order to do this you, it's compulsory to know the
JSON form and labels for an accident.

#### Request format

`POST $HOST/api/records/add`

#### Request example

In addition to the POST request at the above route you have to complete the `body` part of
the request with a JSON. e.g.:

```json
{
	"source": "danWeb",
	"severity": "3",
	"startTime": "2016-02-08T05:46:00.000+00:00",
	"endTime": "2016-02-08T11:00:00.000+00:00",
	"startLat": 39.865147,
	"startLong": -84.058723,
	"distance": 0.03,
	"street": "I-60R",
	"county": "Montgomery",
	"state": "OH",
	"zipCode": "45424",
	"amenity": "false",
	"bump": "false",
	"crossing": "false",
	"giveWay": "false",
	"junction": "false",
	"noExit": "false",
	"railway": "false",
	"roundabout": "false",
	"station": "false",
	"stop": "false",
	"trafficCalming": "false",
	"trafficSignal": "false",
	"turningLoop": "false"
}
```

The JSON's data represents the form and values you want to add for an accident.

#### Response example

If the actions was succeed, a possible answer could be:

```json
{
	"success": true,
	"data": {
		"accident": {
			"_id": "5ee14805ab5e2a1d5a550dc9",
			"source": "danWeb",
			"severity": 3,
			"startTime": "2016-02-08T05:46:00.000Z",
			"endTime": "2016-02-08T11:00:00.000Z",
			"startLat": 39.865147,
			"startLong": -84.058723,
			"distance": 0.03,
			"street": "I-60R",
			"county": "Montgomery",
			"state": "OH",
			"zipCode": "45424",
			"amenity": false,
			"bump": false,
			"crossing": false,
			"giveWay": false,
			"junction": false,
			"noExit": false,
			"railway": false,
			"roundabout": false,
			"station": false,
			"stop": false,
			"trafficCalming": false,
			"trafficSignal": false,
			"turningLoop": false,
			"__v": 0
		}
	}
}
```

As you can see, there is an ID which is uniquely generated by mongoose. Afterwards, the
accident can be identified after that ID.

### PATCH

Aim: update an accident by its ID.

#### Request format

`PATCH $HOST/api/records/:id`

#### Request example

`PATCH $HOST/api/records/5ee14805ab5e2a1d5a550dc9` In order to make an update you should
put in the `body` part of the request the labels and their values you want to update. In
any case the labels aren't corectly written an error might appear.

`body` example:

```json
{
	"severity": 2
}
```

The request will change the severity value of the accident with the id
`5ee14805ab5e2a1d5a550dc9`.

#### Response example

```json
{
	"success": true,
	"data": {
		"updated": {
			"_id": "5ee14805ab5e2a1d5a550dc9",
			"source": "danWeb",
			"severity": 2,
			"startTime": "2016-02-08T05:46:00.000Z",
			"endTime": "2016-02-08T11:00:00.000Z",
			"startLat": 39.865147,
			"startLong": -84.058723,
			"distance": 0.03,
			"street": "I-60R",
			"county": "Montgomery",
			"state": "OH",
			"zipCode": "45424",
			"amenity": false,
			"bump": false,
			"crossing": false,
			"giveWay": false,
			"junction": false,
			"noExit": false,
			"railway": false,
			"roundabout": false,
			"station": false,
			"stop": false,
			"trafficCalming": false,
			"trafficSignal": false,
			"turningLoop": false,
			"__v": 0,
			"visibility": 8
		}
	}
}
```

### DELETE

Aim: delete an accident by its ID.

#### Request format

`DELETE $HOST/api/records/:id`

#### Request example

`DELETE $HOST/api/records/5ee14805ab5e2a1d5a550dc9`

A wrong id won't delete anything, but there will be a specific response for this case.

#### Response example

If the id is valid (there is an accident in the database with that ID) the deletion action
will be taken and the response will be:

```json
{
	"success": true
}
```

In any other case:

```json
{
	"success": false
}
```
