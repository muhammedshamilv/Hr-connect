var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function (req, res, next) {
  console.log(req.params.id);
  res.send(`who ${req.params.id}`);
});

module.exports = router;
