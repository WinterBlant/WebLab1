let APIkey = '28b4ff63e143043a4cf62a826e7449ea';
let weather;
let source = document.getElementById('hdlbrs_tmplt').innerHTML;
let template = Handlebars.compile(source);
let error_tmplt = Handlebars.compile(document.getElementById('error_tmplt').innerHTML);

document.getElementById('coolForm').addEventListener("submit", function (event) {
    event.preventDefault();
    getWeather(event.target.findCity.value);
});

function fillWeather(weather) {
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

function getWeather(cityName) {
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather',
        dataType: 'json',
        data: {
            q: cityName,
            appid: APIkey
        },
    })
        .always(function () {
            let prevwth = document.getElementById('divWeather');
            let preverr = document.getElementById('error');
            if (prevwth) {
                prevwth.remove();
            } else if (preverr) {
                preverr.remove();
            }
        }
        )
        .done(
            function (data) {
                weather = data;
                fillWeather(weather);
            }
        )
        .fail(
            function (err) {
                let data = {
                    error1: err.status + ' ' + err.statusText,
                    error2: 'Details: ' + err.responseJSON.message
                }
                let html = error_tmplt(data);
                let body = document.getElementById('body');
                let div = document.createElement('div');
                div.innerHTML = html;
                div.id = 'error';

                body.appendChild(div);
            }
        )
}