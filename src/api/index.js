const express = require('express');

const twitter = require('./twitter');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/twitter', twitter);

module.exports = router;
