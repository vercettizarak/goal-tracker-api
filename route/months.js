const express = require('express');
const auth = require('../middleware/auth');
const route = express.Router();
const Month = require('../models/month');

//@route    POST api/months
//@desc     Post Month data
//@access   Private
route.post('/', auth, async (req, res) => {
  //Retrive data
  const { data, num } = req.body;
  //Check data
  if (!data || !num) return res.status(400).send('Please add valid data');
  try {
    //create and save data
    const month = new Month({ data, num, user: req.user._id });

    await month.save();

    //send response
    res.json({ msg: `Month ${num} saved` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/months
//@desc     Get Month data
//@access   Private
route.get('/:num', auth, async (req, res) => {
  try {
    //Check month
    const month = await Month.findOne({
      num: req.params.num,
      user: req.user._id,
    });

    if (!month) return res.status(404).json({ msg: 'Month not found' });

    //send month
    res.json(month);
  } catch (err) {
    console.error(err);
    res.status(500).json({ send: 'Server Error' });
  }
});

module.exports = route;
