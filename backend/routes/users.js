var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bodyParser = require('body-parser');
const { promise } = require('bcrypt/promises');
var jwt = require('jsonwebtoken');


/* GET users listing. */
router.post('/register', function (req, res, next) {
  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: new Date().toISOString()
  });

  let promise = user.save();

  promise.then(function (doc) {
    return res.status(201).json(doc)
    // next();
  })

  promise.catch(function (err) {
    return res.status(501).json({ message: 'Error in registering user' });
    // next();
  })
  // next();
})

router.post('/login', function (req, res, next) {
  let promise = User.findOne({ email: req.body.email }).exec(); //exec to get back promise
  promise.then(function (doc) {
    if (doc) {
      if (doc.isValid(req.body.password)) {
        let token = jwt.sign({ username: doc.username }, 'secret', { expiresIn: '1200h' });
        return res.status(200).json(token)
      }
      else {
        res.status(501).json({ message: "Invalid credentials" })
      }
    }
    else {
      res.status(501).json({ message: "User email is not registered" })
    }
  });
  promise.catch(function (err) {
    return res.status(501).json({ message: "some error" });
  })
})


router.get('/username', verifyToken, (req, res, next) => {
  return res.status(200).json(decodedToken.username)
});
router.get('/getPlaylist', verifyToken, (req, res, next) => {
  return res.status(200).json(decodedToken.playlist)
});

function verifyToken(req, res, next) {
  let token = req.query.token;
  jwt.verify(token, 'secret', function (err, tokenData) {
    if (err) {
      return res.send(400).json({ message: "Unauthorised request" });
    }
    if (tokenData) {
      decodedToken = tokenData;
      next();
    }
  })
}
// router.get('/', function (req, res, next) {
//   res.send("Users")
// })

module.exports = router;