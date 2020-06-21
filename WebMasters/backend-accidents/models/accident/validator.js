const { Joi } = require('celebrate');

const stateAbbreviations = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];
const windDirections = ['calm', 'var', 'N', 'S', 'E', 'W', 'NW', 'NE', 'SW', 'SE', 'NNW', 'NNE', 'WNW', 'WSW', 'ENE', 'ESE', 'SSW', 'SSE'];
const timezones = [
	'US/Eastern',
	'US/Pacific',
	'US/Central',
	'US/Mountain',
	'Alaska',
	'Hawaii-Aleutian',
	'Samoa',
	'Chamorro',
	'Atlantic',
];

const schema = Joi.object().keys({
	source: Joi.string().required(),
	tmc: Joi.number().integer().min(1).max(2047),
	severity: Joi.number().allow(1, 2, 3, 4).required(),
	startTime: Joi.date().required(),
	endTime: Joi.date().min(Joi.ref('startTime')).required(),
	startLat: Joi.number().min(-90.0).max(90.0).required(),
	startLong: Joi.number().min(-180.0).max(180.0).required(),
	endLat: Joi.number().min(-90.0).max(90.0),
	endLong: Joi.number().min(-180.0).max(180.0),
	distance: Joi.number().min(0).required(),
	description: Joi.string(),
	number: Joi.number().integer().positive(),
	street: Joi.string().required(),
	side: Joi.string().valid('L', 'R'),
	city: Joi.string(),
	county: Joi.string().required(),
	state: Joi.string().valid(...stateAbbreviations).required(),
	zipCode: Joi.string().regex(/\d+(-\d+)?/).required(),
	timezone: Joi.string().valid(...timezones),
	airportCode: Joi.string().regex(/[A-Z0-9]{4}/),
	weatherTimestamp: Joi.date(),
	temperature: Joi.number(),
	windChill: Joi.number(),
	humidity: Joi.number().integer().min(0).max(100),
	pressure: Joi.number().min(0),
	visibility: Joi.number().integer().min(0),
	windDirection: Joi.string().valid(...windDirections),
	windSpeed: Joi.number().min(0),
	precipitation: Joi.number().min(0),
	weatherCondition: Joi.string(),
	amenity: Joi.bool().required(),
	bump: Joi.bool().required(),
	crossing: Joi.bool().required(),
	giveWay: Joi.bool().required(),
	junction: Joi.bool().required(),
	noExit: Joi.bool().required(),
	railway: Joi.bool().required(),
	roundabout: Joi.bool().required(),
	station: Joi.bool().required(),
	stop: Joi.bool().required(),
	trafficCalming: Joi.bool().required(),
	trafficSignal: Joi.bool().required(),
	turningLoop: Joi.bool().required(),
	sunriseSunsetNight: Joi.bool(),
	civilTwilightNight: Joi.bool(),
	nauticalTwilightNight: Joi.bool(),
	astronomicalTwilightNight: Joi.bool(),
});

module.exports = schema;