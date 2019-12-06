getWeather = jest.fn(cityName => {
    if (cityName === 'correctCityName') {
        return Promise.resolve({
            data: {
                coord: {
                    lon: 37.62,
                    lat: 55.75
                },
                weather: [
                    {
                        id: 804,
                        main: "Clouds",
                        description: "overcast clouds",
                        icon: "04d"
                    }
                ],
                base: "stations",
                main: {
                    temp: 274.84,
                    pressure: 1007,
                    humidity: 86,
                    temp_min: 273.71,
                    temp_max: 275.93
                },
                visibility: 10000,
                wind: {
                    speed: 7,
                    deg: 260
                },
                clouds: {
                    all: 90
                },
                dt: 1575622242,
                sys: {
                    type: 1,
                    id: 9029,
                    country: "RU",
                    sunrise: 1575610919,
                    sunset: 1575637144
                },
                timezone: 10800,
                id: 524901,
                name: "Moscow",
                cod: 200
            }

        });
    }
    else {
        return Promise.reject({
            response: {
                data: {
                    cod: "404",
                    message: "city not found"
                },
                status: 404,
                statusText: "Not Found",
            }
        });
    }
});

exports.getWeather = getWeather;