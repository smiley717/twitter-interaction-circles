const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(globalThis);
  res.json(['😀', '😳', '🙄']);
});

module.exports = router;
