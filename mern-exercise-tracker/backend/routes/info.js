
const router = require('express').Router();
let Info = require('../models/info.model');

router.route('/').get((req, res) => {
  Info.find()
    .then(info => res.json(info))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const url = req.body.url;

  const newInfo = new Info({
    url,
  });

  newInfo.save()
  .then(() => res.json('Info added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;