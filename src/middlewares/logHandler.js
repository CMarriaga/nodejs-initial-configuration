const chalk = require('chalk');

function logger(req, res, next) {
  const requestTime = Date.now();
  res.on('finish', () => {
    const { method, originalUrl } = req;
    const { statusCode, _contentLength: contentLength } = res;
    const loggerMethod = colorText(method, 'method');
    const loggerPath = colorText(originalUrl);
    const loggerStatus = colorText(statusCode, 'status');
    const loggerContentLength = colorText(contentLength);
    const loggerTime = Date.now() - requestTime;

    console.log(`${loggerMethod} ${loggerPath} ${loggerStatus} - ${loggerTime} ms - ${loggerContentLength} bytes`); //eslint-disable-line
  });
  res.on('timeout', () => {
    const { method, originalUrl } = req;
    const loggerMethod = colorText(method, 'method');
    const loggerPath = colorText(originalUrl);
    const loggerStatus = colorText(500, 'status');

    console.log(`${loggerMethod} ${loggerPath} ${loggerStatus} - -- ms - 0 bytes`); //eslint-disable-line
  });
  next();
}

function colorText(data, title = 'none') {
  // Could use (switch) inside each case, but i think this way is more readable
  switch (title) {
    case 'status':
      if (data >= 200 && data < 300) return chalk.hex('00FF00')(data);
      if (data >= 300 && data < 400) return chalk.hex('00FFFF')(data);
      if (data >= 400 && data < 500) return chalk.hex('FFB947')(data);
      if (data >= 500 && data < 600) return chalk.hex('FF0000')(data);
      return chalk.hex('FFFFFF')(data);

    case 'method':
      if (data === 'GET') return chalk.hex('00FF00')(data);
      if (data === 'POST') return chalk.hex('00CCFF')(data);
      if (data === 'PUT') return chalk.hex('FF00FF')(data);
      if (data === 'PATCH') return chalk.hex('FFB947')(data);
      if (data === 'DELETE') return chalk.hex('FF0000')(data);
      return chalk.hex('FFFFFF')(data);

    default:
      return chalk.hex('FFFFFF')(data);
  }
}

module.exports = logger;
