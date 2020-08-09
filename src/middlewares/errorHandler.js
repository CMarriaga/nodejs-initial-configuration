const fs = require('fs');
// const { v4: uuidv4 } = require('uuid');
const cr = require('custom-responses');

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const data = {
    // id: uuidv4(),
    status,
    solved: false,
    solution: null,
    code: err.code,
    route: req.path,
    canceled: false,
    repeated: false,
    date: new Date(),
    stack: err.stack,
    method: req.method,
    header: req.headers,
    message: err.message,
    body: req.body,
    query: req.query,
    reqConnection: {
      complete: req.complete,
      destroyed: req.destroyed,
    },
  };

  cr.success(res, status, err.altMessage || 'Internal error');

  console.log(`Fallo metodo ${req.path} con mensaje: ${err.message}`); //eslint-disable-line

  if (status >= 500 && !err.ignore) {
    fs.appendFile(`${__dirname}/../../logs/app.log`, JSON.stringify(data) + '\n', (err) => {
      if (err) console.log(err); //eslint-disable-line
    });
  }
}

module.exports = errorHandler;
