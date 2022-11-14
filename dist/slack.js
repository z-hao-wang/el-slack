"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhook = void 0;
const https = require('https');
function webhook(uri, message) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!uri)
            return;
        const postDataJson = typeof message === 'string' ? {
            username: 'data_server',
            text: message,
        } : message;
        const postDataRaw = JSON.stringify(postDataJson);
        const options = {
            method: 'POST',
            hostname: 'hooks.slack.com',
            path: uri.replace('https://hooks.slack.com', ''),
            headers: { 'Content-Type': 'application/json', 'Content-Length': postDataRaw.length },
        };
        return new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                resolve(res);
                res.on('data', (d) => {
                    process.stdout.write(d);
                });
            });
            req.on('error', (e) => {
                console.error('slack webhook error', e);
                reject(e);
            });
            req.write(postDataRaw);
            req.end();
        });
    });
}
exports.webhook = webhook;
