'use strict';
const router = require('express').Router(); //eslint-disable-line
const cr = require('custom-responses');

// routes
router.get('/', (req, res) => {
  cr.success(res, 200, 'Welcome to my endpoint!');
});

module.exports = router;
