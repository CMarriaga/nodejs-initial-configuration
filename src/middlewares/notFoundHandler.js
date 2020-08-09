const cr = require('custom-responses');

function notFoundHandler(err, req, res, next) {
  if (err) {
    next(err);
  } else {
    next(cr.error({ altMessage: 'Not Found', status: 404, ignore: true }));
  }
}

module.exports = notFoundHandler;
