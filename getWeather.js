let APIkey = '28b4ff63e143043a4cf62a826e7449ea';
const axios = require('axios');

function getWeather(cityName) {
    return axios({
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
            q: cityName,
            appid: APIkey
        },
    })
}

exports.getWeather = getWeather;