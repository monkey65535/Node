const express = require('express')
const router = express.Router()

router.get('/user', (req, res, next) => {
  res.send('user')
})

module.exports = router;
