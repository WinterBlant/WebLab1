global.Handlebars = require('handlebars');

const bodyHtml =
    '<div id="body">' +
    '<form id="coolForm"></form>' +
    '<script id="hdlbrs_tmplt" type="text/x-handlebars-template"><div id="place">{{ place }}</div><div id="curWeather">{{ curWeather }}</div><div id="temp">{{ temp }}</div><div id="wind">{{ wind }}</div><div id="humid">{{ humid }}</div><div id="press">{{ press }}</div></script>' +
    '<script id="error_tmplt" type="text/x-handlebars-template"><p>{{ error1 }}</p><p>{{ error2 }}</p></script>' +
    '</div>';

Object.defineProperty(document, 'currentScript', {
    value: document.createElement('script'),
});
document.body.innerHTML = bodyHtml;

exports.bodyHtml = bodyHtml;