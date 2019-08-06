const express = require('express');
const router = express.Router();
const { User } = require('../models/User');

router.get('/', (req, res) => {
  res.render('index');
})

router.get('/done', (req, res) => {
  res.render('done');
})

router.get('/registration', (req, res) => {
  res.render('reg');
})

router.post('/addUser', async (req, res) => {
  const check = await User.findOne({ login: req.body.login });
  console.log(check)
  if (!check) {
    const user = new User({
      login: req.body.login,
      password: req.body.password,
    })
    user.password = user.generateHash(req.body.password);
    user.save();
    res.json(true);
  } else {
    res.json(false);
  }
})

router.post('/match', async (req, res) => {
  const user = await User.findOne({ login: req.body.login });
  if (user.comparePassword(req.body.password)) {
    res.json(true)
  } else {
    res.json(false);
  }
})

module.exports = router;