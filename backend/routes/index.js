const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
  response.send('API works correctly');
});

module.exports = router;