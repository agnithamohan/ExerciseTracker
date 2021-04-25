
const router = require('express').Router();
let Post = require('../models/post.model');

router.route('/').get((req, res) => {
  Post.find()
    .then(topic => res.json(topic))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const comments = req.body.comments;
  const newPost = new Post({
    title,
    description,
    comments
  });

  newPost.save()
  .then(() => res.json('Post added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addcomment/:id').post((req, res) => {
    const id = req.body.id;
    const comment = req.body.comment;

    Post.findById(req.params.id)
    .then(post => {
        post.comments.push(comment);

        post.save()
        .then(() => res.json('Post updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;