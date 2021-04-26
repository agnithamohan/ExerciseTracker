
const router = require('express').Router();
let Topic = require('../models/topics.model');

router.route('/').get((req, res) => {
  Topic.find()
    .then(topic => res.json(topic))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const avl_sp = req.body.avl_sp;
  const newTopic = new Topic({
    title,
    avl_sp
  });

  newTopic.save()
  .then(() => res.json('Topic added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;