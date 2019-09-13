import * as request from 'request';

export function webhook(uri: string, message: string, cb?: any) {
  if (!uri) return;
  const options = {
    uri,
    headers: { 'Content-Type': 'application/json' },
    json: {
      username: 'data_server',
      text: message,
    },
  };
  request.post(options, function(error: any, response: request.Response, body: any) {
    if (!error && response.statusCode === 200) {
      console.log(body);
    } else {
      console.log(`error: ${response.statusCode} \n ${response.body}`);
    }
    cb && cb();
  });
}
