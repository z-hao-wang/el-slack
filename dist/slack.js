"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
function webhook(uri, message, cb) {
    if (!uri)
        return;
    const options = {
        uri,
        headers: { 'Content-Type': 'application/json' },
        json: {
            username: 'data_server',
            text: message,
        },
    };
    request.post(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
        }
        else {
            console.log(`error: ${response.statusCode} \n ${response.body}`);
        }
        cb && cb();
    });
}
exports.webhook = webhook;
