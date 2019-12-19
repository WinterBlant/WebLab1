let source = document.getElementById('hdlbrs_tmplt').innerHTML;
let template = Handlebars.compile(source);
let error_tmplt = Handlebars.compile(document.getElementById('error_tmplt').innerHTML);
const { getWeather } = require('./getWeather');

submit = async event => {
    event.preventDefault();
    try {
        const response = await getWeather(event.target.findCity.value);
        fillWeather(response.data);
    } catch (error) {
        fillError(error.response);
    }
};
const res = {
    resetprev() {
        let prevwth = document.getElementById('divWeather');
        let preverr = document.getElementById('error');
        if (prevwth) {
            prevwth.remove();
        } else if (preverr) {
            preverr.remove();
        }
    }
}

function fillWeather(weather) {
    res.resetprev();
    let data = {
        place: weather.name + ', ' + weather.sys.country,
        curWeather: 'Current weather: ' + weather.weather[0].main,
        temp: 'Temperature: ' + (weather.main.temp - 273.15).toFixed(0) + '°C',
        wind: 'Wind: ' + weather.wind.speed + 'm/s',
        humid: 'Humidity: ' + weather.main.humidity + '%',
        press: 'Pressure: ' + ((weather.main.pressure * 100) / 133.322).toFixed(2) + ' Torr'
    };
    let html = template(data);
    let body = document.getElementById('body');
    let div = document.createElement('div');
    div.innerHTML = html;
    div.id = 'divWeather';

    body.appendChild(div);
}

function fillError(err) {
    res.resetprev();
    let data = {
        error1: err.status + ' ' + err.statusText,
        error2: 'Details: ' + err.data.message
    }
    let html = error_tmplt(data);
    let body = document.getElementById('body');
    let div = document.createElement('div');
    div.innerHTML = html;
    div.id = 'error';

    body.appendChild(div);
}

document.getElementById('coolForm').addEventListener("submit", submit);

exports.submit = submit;
exports.fillWeather = fillWeather;
exports.fillError = fillError;
exports.res = res;
