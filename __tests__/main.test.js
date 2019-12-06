const { submit, fillWeather, fillError } = require('../index.js');
const { bodyHtml } = require('../setupJest');
jest.mock('../getWeather.js');

beforeEach(() => {
    document.body.innerHTML = bodyHtml;
});

describe('drawing result functions', () => {
    test('render error', () => {
        const err = {
            "data": {
                "cod": "404",
                "message": "city not found"
            },
            "status": 404,
            "statusText": "Not Found",
        };
        fillError(err);

        const expectedResult =
            '<p>404 Not Found</p>' +
            '<p>Details: city not found</p>'
            ;

        expect(document.getElementById('error').innerHTML)
            .toEqual(expectedResult);
    })

    test('render city', () => {
        const city = {
            "coord": {
                "lon": 37.62,
                "lat": 55.75
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 274.84,
                "pressure": 1007,
                "humidity": 86,
                "temp_min": 273.71,
                "temp_max": 275.93
            },
            "visibility": 10000,
            "wind": {
                "speed": 7,
                "deg": 260
            },
            "clouds": {
                "all": 90
            },
            "dt": 1575622242,
            "sys": {
                "type": 1,
                "id": 9029,
                "country": "RU",
                "sunrise": 1575610919,
                "sunset": 1575637144
            },
            "timezone": 10800,
            "id": 524901,
            "name": "Moscow",
            "cod": 200
        };
        fillWeather(city);

        const expectedResult =
            '<div id="place">Moscow, RU</div>' +
            '<div id="curWeather">Current weather: Clouds</div>' +
            '<div id="temp">Temperature: 2°C</div>' +
            '<div id="wind">Wind: 7m/s</div>' +
            '<div id="humid">Humidity: 86%</div>' +
            '<div id="press">Pressure: 755.31 Torr</div>';

        expect(document.getElementById('divWeather').innerHTML)
            .toEqual(expectedResult);
    })

    test('render error after weather', () => {
        const weather = document.getElementById('body');
        const previousResult = document.createElement('div');
        previousResult.innerHTML =
            '<div id="place">Moscow, RU</div>' +
            '<div id="curWeather">Current weather: Clouds</div>' +
            '<div id="temp">Temperature: 2°C</div>' +
            '<div id="wind">Wind: 7m/s</div>' +
            '<div id="humid">Humidity: 86%</div>' +
            '<div id="press">Pressure: 755.31 Torr</div>';
        weather.appendChild(previousResult);

        const err = {
            "data": {
                "cod": "404",
                "message": "city not found"
            },
            "status": 404,
            "statusText": "Not Found",
        };
        fillError(err);

        const expectedResult =
            '<p>404 Not Found</p>' +
            '<p>Details: city not found</p>'
            ;

        expect(document.getElementById('error').innerHTML)
            .toEqual(expectedResult);
    })

    test('render weather after error', () => {
        const error = document.getElementById('body');
        const previousResult = document.createElement('div');
        previousResult.innerHTML =
            '<p>404 Not Found</p>' +
            '<p>Details: city not found</p>';
        error.appendChild(previousResult);

        const city = {
            "coord": {
                "lon": 37.62,
                "lat": 55.75
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 274.84,
                "pressure": 1007,
                "humidity": 86,
                "temp_min": 273.71,
                "temp_max": 275.93
            },
            "visibility": 10000,
            "wind": {
                "speed": 7,
                "deg": 260
            },
            "clouds": {
                "all": 90
            },
            "dt": 1575622242,
            "sys": {
                "type": 1,
                "id": 9029,
                "country": "RU",
                "sunrise": 1575610919,
                "sunset": 1575637144
            },
            "timezone": 10800,
            "id": 524901,
            "name": "Moscow",
            "cod": 200
        };
        fillWeather(city);

        const expectedResult =
            '<div id="place">Moscow, RU</div>' +
            '<div id="curWeather">Current weather: Clouds</div>' +
            '<div id="temp">Temperature: 2°C</div>' +
            '<div id="wind">Wind: 7m/s</div>' +
            '<div id="humid">Humidity: 86%</div>' +
            '<div id="press">Pressure: 755.31 Torr</div>';

        expect(document.getElementById('divWeather').innerHTML)
            .toEqual(expectedResult);
    })
});

describe('submit function', () => {
    test('submit should call getWeather and fillWeather', async () => {
        const event = {
            target: {
                findCity: { value: "correctCityName" }
            }
        };
        event.preventDefault = jest.fn();
        await submit(event);

        expect(event.preventDefault).toBeCalled();

        const expectedResult =
            '<div id="place">Moscow, RU</div>' +
            '<div id="curWeather">Current weather: Clouds</div>' +
            '<div id="temp">Temperature: 2°C</div>' +
            '<div id="wind">Wind: 7m/s</div>' +
            '<div id="humid">Humidity: 86%</div>' +
            '<div id="press">Pressure: 755.31 Torr</div>';

        expect(document.getElementById('divWeather').innerHTML)
            .toEqual(expectedResult);
    });

    test('submit submit should call getWeather and fillError', async () => {
        const event = {
            target: {
                findCity: { value: "incorrectCityName" }
            }
        };
        event.preventDefault = jest.fn();
        await submit(event);

        expect(event.preventDefault).toBeCalled();

        const expectedResult =
            '<p>404 Not Found</p>' +
            '<p>Details: city not found</p>';

        expect(document.getElementById('error').innerHTML)
            .toEqual(expectedResult);
    })

    test('submit renders weather after error already rendered', async () => {
        const error = document.getElementById('body');
        const previousResult = document.createElement('div');
        previousResult.innerHTML =
            '<p>404 Not Found</p>' +
            '<p>Details: city not found</p>';
        error.appendChild(previousResult);

        const event = {
            target: {
                findCity: { value: "correctCityName" }
            }
        };
        event.preventDefault = jest.fn();
        await submit(event);

        expect(event.preventDefault).toBeCalled();

        const expectedResult =
            '<div id="place">Moscow, RU</div>' +
            '<div id="curWeather">Current weather: Clouds</div>' +
            '<div id="temp">Temperature: 2°C</div>' +
            '<div id="wind">Wind: 7m/s</div>' +
            '<div id="humid">Humidity: 86%</div>' +
            '<div id="press">Pressure: 755.31 Torr</div>';

        expect(document.getElementById('divWeather').innerHTML)
            .toEqual(expectedResult);
    })

    test('submit renders error after weather already rendered', async () => {
        const weather = document.getElementById('body');
        const previousResult = document.createElement('div');
        previousResult.innerHTML =
            '<div id="place">Moscow, RU</div>' +
            '<div id="curWeather">Current weather: Clouds</div>' +
            '<div id="temp">Temperature: 2°C</div>' +
            '<div id="wind">Wind: 7m/s</div>' +
            '<div id="humid">Humidity: 86%</div>' +
            '<div id="press">Pressure: 755.31 Torr</div>';
        weather.appendChild(previousResult);

        const event = {
            target: {
                findCity: { value: "incorrectCityName" }
            }
        };
        event.preventDefault = jest.fn();
        await submit(event);

        expect(event.preventDefault).toBeCalled();

        const expectedResult =
            '<p>404 Not Found</p>' +
            '<p>Details: city not found</p>';

        expect(document.getElementById('error').innerHTML)
            .toEqual(expectedResult);
    })
});