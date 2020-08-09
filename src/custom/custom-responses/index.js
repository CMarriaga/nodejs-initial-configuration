'use strict';

exports.success = function (res, status, message, fieldData = null, fieldName = 'data', success = true) {
  let response = {
    message,
    status: status || 200,
    success: !!(status < 400) && success,
  };
  if (fieldData) {
    response = {
      ...response,
      [fieldName]: fieldData,
    };
  }
  res.status(response.status).send(response);
};

exports.error = function ({ altMessage, status = 500, ignore = false }, error = new Error('Custom error')) {
  error.message === 'Custom error' ? (error.message = `${error.message} = ${altMessage}`) : error.message;
  error.altMessage = (error && error.altMessage) || altMessage || 'Internal error';
  error.status = status;
  error.ignore = ignore;
  return error;
};

exports.dberror = function ({ methodName, methodData = {} }, error = new Error('Custom error')) {
  error.methodName = methodName;
  error.methodData = methodData;
  return error;
};
