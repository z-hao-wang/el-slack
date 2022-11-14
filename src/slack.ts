const https = require('https');

export async function webhook(uri: string, message: string | any) {
  if (!uri) return;
  const postDataJson =
    typeof message === 'string'
      ? {
          username: 'data_server',
          text: message,
        }
      : message;
  const postDataRaw = JSON.stringify(postDataJson);

  const options = {
    method: 'POST',
    hostname: 'hooks.slack.com',
    path: uri.replace('https://hooks.slack.com', ''),
    headers: { 'Content-Type': 'application/json', 'Content-Length': postDataRaw.length },
  };
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res: any) => {
      resolve(res);
      res.on('data', (d: any) => {
        process.stdout.write(d);
      });
    });

    req.on('error', (e: Error) => {
      console.error('slack webhook error', e);
      reject(e);
    });

    req.write(postDataRaw);
    req.end();
  });
}
