'use strict';

angular.module('hackaboxApp')
  .controller('PostCtrl', function ($http, $scope, $window, $routeParams, $location, Post, $rootScope) {
    $scope.user = {};
    $scope.errors = {};
    $scope.sendinfo = {};
    $scope.post;
    $scope.comment = {};
    $scope.comments = [];

    $http.get('/api/users/me').success(function (data) {$scope.user = data});

    $scope.postit = function() {
      //var random = Math.floor((Math.random() * 99999) + 1).toString(); 
      console.log('in postit');
      
      //$scope.submitted = true;
      $scope.sendinfo = {
          posttitle: $scope.post.posttitle,
          content: $scope.post.content,
          username: $scope.user.email,
          date: new Date().toString(),
      };

      $http({
          url : '/api/posts',
          method : 'POST',
          async : true,
          cache : false,
          headers : { 'Accept' : 'application/json' , 'Pragma':'no-cache'},
          data : $scope.sendinfo
      }).success(function() {
         console.log("this worked for some reason");
         $window.location.href = '/forum';
      });
    };

    $scope.loadpost = function() {
      $(".commentonit").hide();
      $(".jumbotroncomment").hide();
      $http({
          url : '/api/posts/'+$routeParams.id,
          method : 'GET',
          async : true,
          cache : false,
          headers : { 'Accept' : 'application/json' , 'Pragma':'no-cache'}
      }).success(function(data) {
         //console.log("this worked for some reason");
         $scope.post = data;
         $scope.comments = $scope.post.comments;
      });
    };

    $scope.loadpost2 = function() {
      $http({
          url : '/api/posts/'+$routeParams.id,
          method : 'GET',
          async : true,
          cache : false,
          headers : { 'Accept' : 'application/json' , 'Pragma':'no-cache'}
      }).success(function(data) {
         //console.log("this worked for some reason");
         $scope.post = data;
         $scope.comments = $scope.post.comments;
      });
    };

    $scope.deleteit = function(data) {
      if($scope.user.email === data.username) {
        console.log('we made it haha');
        $http({
            url : '/api/posts/'+data._id,
            method : 'DELETE',
            async : true,
            cache : false,
            headers : { 'Accept' : 'application/json' , 'Pragma':'no-cache'}
        }).success(function() {
           console.log("this worked for deleting");
           $window.location.href = '/forum';
        });
      }
      else {
        console.log('uh oh a boo boo');
        $window.alert("Nice try - but you didn't write this post.");
      }
    };

    $scope.editit = function(data) {
      if($scope.user.email === data.username) {
        $location.path('/postedit/'+data._id);
      }
      else {
        $window.alert("Nice try - but you didn't write this post.");
      }
    };

    $scope.commentonit = function() {
      $(".jumbotroncomment").show();
      var comment = {checkedit: false, username: $scope.user.email, date: null, content: $scope.comment.content, id:  Math.floor((Math.random() * 999999999) + 1)};
      comment.date = new Date().toString();
      /*$scope.comment.date = new Date().toString();*/
      $scope.comments.push(comment);
      $scope.post.comments = $scope.comments;
      Post.update({ id:$scope.post._id }, $scope.post, function() {for(var i = 0; i<$scope.post.comments.length; i++) {console.log($scope.post.comments[i])}});
      //$(".commentonit").hide();
      //$scope.comment = null;
    };

    /*$scope.comment = function() {
      //Graphics.slideToggle("commentonit");
    };*/

    $scope.toggle = function() {
      $scope.$broadcast('event:toggle');
      $scope.$broadcast('event:change');
    };

    $scope.deletecomment = function(data) {
      if($scope.user.email === data.username) { 
        console.log($scope.comments.indexOf(data.id));
        var x = $scope.comments.indexOf(data.id);
        $scope.comments.splice(x, 1);
        $scope.post.comments = $scope.comments;
        Post.update({ id:$scope.post._id }, $scope.post, function() {/*for(var i = 0; i<$scope.post.comments.length; i++) {console.log($scope.post.comments[i])*/});
      }
      else {
        $window.alert("Nice try, but you didn't write this comment.")
      }
    };

    $scope.commentedit = function(data) {
      //$scope.loadpost2();
      if($scope.user.email === data.username) {
        console.log(data.id + " this is data.id from form");
        for(var i = 0; i<$scope.comments.length; i++) {
          console.log($scope.comments[i].id);
        }
        for(var i = 0; i<$scope.comments.length; i++) {
          if(data.id === $scope.comments[i].id) {
            var hold = $scope.comments[i];
            hold.checkedit = true;
            $scope.comments.splice(i, 1, hold);
            $scope.post.comments = $scope.comments;
            Post.update({ id:$scope.post._id }, $scope.post, function() {/*for(var i = 0; i<$scope.post.comments.length; i++) {console.log($scope.post.comments[i])*/});
            //$location.path('/postview/'+$scope.post._id);
          }
        }
        //$rootScope.$broadcast('event:edit', data);
        //$rootScope.$broadcast('event:done', data);
      }
      else {
        $window.alert("Nice try, but you didn't write this comment.")
      }
    };

    $scope.commentsave = function(data) { 
      //$scope.checkedit = false;
      if($scope.user.email === data.username) {  
        console.log(data.content);
        /*$scope.comment.content = data.content;
        $scope.comment.id = data.id;
        $scope.comment.username = data.username;
        $scope.comment.date = data.date;
        $scope.comment.checkedit = false;*/
        var hold = data;
        hold.checkedit = false;

        for(var i = 0; i<$scope.comments.length; i++) {
          if(data.id === $scope.comments[i].id) {
            $scope.comments[i] = hold;
            $scope.comments.splice(i, 1, hold);
            $scope.post.comments = $scope.comments;
            Post.update({ id:$scope.post._id }, $scope.post, function() {/*for(var i = 0; i<$scope.post.comments.length; i++) {console.log($scope.post.comments[i])*/});
            //$location.path('/postview/'+$scope.post._id);
          }
        }
      }
      else {
        $window.alert("Nice try, but you didn't write this comment.");
      }
    };
  })
  .controller('PostEditCtrl', function ($http, $scope, $window, $routeParams, Post, $location) {
    $scope.user = {};
    $scope.errors = {};
    $scope.sendinfo = {};
    $scope.post;

    $http.get('/api/users/me').success(function (data) {$scope.user = data});

    $scope.saveedit = function() {
      console.log($scope.post._id + ' post id');
      // Now call update passing in the ID first then the object you are updating
      Post.update({ id:$scope.post._id }, $scope.post, function() {$location.path('/postview/'+$scope.post._id)});
    };

    $scope.loadinfo = function() {
      $http({
          url : '/api/posts/'+$routeParams.id,
          method : 'GET',
          async : true,
          cache : false,
          headers : { 'Accept' : 'application/json' , 'Pragma':'no-cache'}
      }).success(function(data) {
         //console.log("this worked for some reason");
         $scope.post = data;
      });
    };
  });