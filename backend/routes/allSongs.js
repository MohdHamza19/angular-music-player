var express = require('express');
var router = express.Router();
const songsFile = require('../files/songs.json') 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendFile('G:/Program Files/MiscPl/miscPl/backend/files/songs.json');
});

module.exports = router;
