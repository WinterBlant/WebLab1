HTML({ lang: "en" },
    HEAD({},
        TITLE("Weather"),
        STYLE({ type: "text/css" }),
        SCRIPT({src: "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"})
    ),

    BODY(
        FORM (
            INPUT ({id: "findCity", type: "text"}, "Write your city"),
            BUTTON ({id: "submit"}, "Find"),
            ),
        DIV ({id: "divWeather"},
            DIV ({id: "err"}),
            DIV ({id: "place"}),
            DIV ({id: "curWeather"}),
            DIV ({id: "temp"}),
            DIV ({id: "wind"}),
            DIV ({id: "humid"}),
            DIV ({id: "press"})
            )
    )
)

let APIkey = '28b4ff63e143043a4cf62a826e7449ea';
let weather;

document.getElementById('submit').addEventListener("click", function(event){
    event.preventDefault();
    lookForCity()
});

function lookForCity() {
    let nameCity = document.getElementById('findCity').value;
    getWeather(nameCity);
}

function fillElements(err, place, curWeather, temp, wind, humid, press) {
    document.getElementById('err').innerText = err;
    document.getElementById('place').innerText = place;
    document.getElementById('curWeather').innerText = curWeather;
    document.getElementById('temp').innerText = temp;
    document.getElementById('wind').innerText = wind;
    document.getElementById('humid').innerText = humid;
    document.getElementById('press').innerText = press;
}

function fillWeather(weather) {
    fillElements('',
        weather.name + ', ' + weather.sys.country,
        'Current weather: ' + weather.weather[0].main,
        'Temperature: ' + (weather.main.temp - 273.15).toFixed(0) + '°C',
        'Wind: ' + weather.wind.speed + 'm/s',
        'Humidity: ' + weather.main.humidity + '%',
        'Pressure: ' + ((weather.main.pressure * 100) / 133.322).toFixed(2) + ' Torr'
    );
}

function getWeather(cityName) {
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather',
        dataType: 'json',
        data: {
            q: cityName,
            appid: APIkey
        }
    })
        .done(
            function (data) {
                weather = data;
                fillWeather(weather);
            }
        )
        .fail(
            function (err) {
                fillElements(err.status + ' ' + err.statusText + '\r\n' + 'Details: ' + err.responseJSON.message,
                    '',
                    '',
                    '',
                    '',
                    '',
                    ''
                );
            }
        )
}