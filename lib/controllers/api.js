'use strict';

var mongoose = require('mongoose'),
    Post = mongoose.model('Post');

/**
 * Get awesome things
 */
exports.posts = function(req, res) {
  return Post.find(function (err, posts) {
    if (!err) {
      return res.json(posts);
    } else {
      return res.send(err);
    }
  });
};

exports.postit = function (req, res) {
  console.log(req.body + " this is req.body");
  var newPost = new Post(req.body);
  //newPost._id = null
  //newPost._id = req.params.id;
  /*newPost.posttitle = req.params.posttitle;
  newPost.content = req.params.content;
  newPost.date = req.params.date;
  newPost.username = req.params.username;*/
  //ewUser.provider = 'local';
  newPost.save(function(err) {
    if (err) return res.json(400, err);
    console.log("in save function");
    //res.redirect('/forum');
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
    //res.redirect('/forum');
  });
};

exports.showinfo = function(req, res, next) {
 var postId = req.params.id;

 Post.findById(postId, function (err, post) {
    return res.json(post);
 });
};

exports.editsave = function(req, res, next) {
  //console.log(req.body.posttitle.toString() + " this is req.body");
  var posty = req.body;
  posty._id = req.body._id;
  console.log(posty._id.toString() + " this is posty");

  function callback (err, numAffected) {
    console.log(err + " " + numAffected);
    if(!err) {
      res.send(200);
      //res.redirect('/forum');
    }
  }

  Post.update({ _id: posty._id }, posty, callback);
};