'use strict';

var mongoose = require('mongoose'),
    Post = mongoose.model('Post');

/**
 * Get awesome things
 */
exports.posts = function(req, res) {
  return Post.find(function (err, posts) {
    if (!err) {
      res.status(200);
      return res.json(posts);
    } else {
      return res.send(err);
    }
  });
};

exports.postit = function (req, res) {
  var newPost = new Post(req.body);
  
  newPost.save(function(err) {
    if (err) return res.json(400, err);
    res.send(200);
  });
};

exports.remove = function(req, res) {
  var postId = req.params.id;
  Post.remove({ _id: postId }, function(err) {
    if (!err) {
            console.log('notification!');
            res.send(200);
    }
    else {
            console.log('error in the remove function');
            res.send(400);
    }
  });
};

exports.showinfo = function(req, res, next) {
 var postId = req.params.id;

 Post.findById(postId, function (err, post) {
    res.status(200);
    res.json(post);
 });
};

exports.editsave = function(req, res, next) {
  var postId = req.params.id;
  var holdypants = {posttitle: req.body.posttitle, namey: req.body.namey, date: req.body.date, content: req.body.content, comments: req.body.comments};

  Post.update({ _id: postId }, holdypants, { upsert: true }, function(err, results) {
    if(err) {
      console.log(err);
    }
    else {
      res.status(200);
      res.json(results);
    }
  });
};