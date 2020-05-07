const express = require('express');
const Quarter = require('../models/quarter');
const route = express.Router();
const auth = require('../middleware/auth');

//@route    POST api/quarters
//@desc     Post day data
//@access   Private
route.post('/', auth, async (req, res) => {
  //Retrive data
  const { data, num } = req.body;
  //Check data
  if (!data || !num) return res.status(400).send('Please add valid data');
  try {
    //ceate and save data
    const quarter = new Quarter({ data, num, user: req.user._id });

    await quarter.save();

    //send response
    res.json({ msg: `Quarter ${num} saved` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/quarters
//@desc     Get Quarterly data
//@access   Private
route.get('/:num', auth, async (req, res) => {
  try {
    //Check quater
    const quarter = await Quarter.findOne({
      num: req.params.num,
      user: req.user._id,
    });

    if (!quarter) return res.status(404).json({ msg: 'Quarter not found' });

    //send Quarter
    res.json(quarter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ send: 'Server Error' });
  }
});

module.exports = route;
