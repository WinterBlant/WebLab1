HTML({ lang: "en" },
    HEAD({},
        TITLE("Weather"),
        STYLE({ type: "text/css" }),
        LINK({rel: "stylesheet", type: "text/css", href: "http://allfont.ru/allfont.css?fonts=comic-sans-ms"}),
        LINK({rel: "stylesheet", href: "style.css"}),
        SCRIPT({src: "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"})
    ),

    BODY( {id: "body"},
        FORM ( {id:"coolForm"},
            INPUT ({id: "findCity", type: "text"}, "Write your city"),
            BUTTON ({id: "submit"}, "Find"),
            ),
        DIV ({id: "divWeather"},
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
let block = document.createElement('div');
let body = document.getElementById('body');
block.id = "block";
body.appendChild(block);
var withDomo = A({href: "http://domo-js.com"}, "Learn about dōmo");
domo.global(true);

document.getElementById('coolForm').addEventListener("submit", function(event){
    event.preventDefault();
    getWeather(event.target.findCity.value);
});

function fillElements(place, curWeather, temp, wind, humid, press) {
    document.getElementById('place').innerText = place;
    document.getElementById('curWeather').innerText = curWeather;
    document.getElementById('temp').innerText = temp;
    document.getElementById('wind').innerText = wind;
    document.getElementById('humid').innerText = humid;
    document.getElementById('press').innerText = press;
}

function fillWeather(weather) {
    fillElements(weather.name + ', ' + weather.sys.country,
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
                let text = err.status + ' ' + err.statusText + '\r\n' + 'Details: ' + err.responseJSON.message;
                block.innerText = text;
            }
        )
}