const express = require('express');
const router = express.Router();

const Pusher = require('pusher');

const mongoose = require('mongoose');

const Vote = require('../models/vote');

var pusher = new Pusher({
  appId: '703483',
  key: 'dc489c3ec33ea61c1add',
  secret: '11f9849c7b483460bd41',
  cluster: 'us2',
  encrypted: true
});

router.get('/', (req, res) => {
  Vote.find().then(votes => res.json({success: true, votes: votes}));
});

router.post('/', (req, res) => {
  const newVote = {
    os: req.body.os,
    points: 1
  }

  new Vote(newVote).save().then(vote => {
    pusher.trigger('os-poll', 'os-vote', {
      points: parseInt(vote.points),
      os: vote.os
    });

    return res.json({success: true, message: 'Thank you for submitting your vote!'});
  });
});



module.exports = router;
