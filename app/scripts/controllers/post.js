'use strict';

angular.module('hackaboxApp')
  .controller('PostCtrl', function (Auth, $http, $scope, $window, $routeParams, $location, Post) {
    $scope.user = {};
    $scope.errors = {};
    $scope.post = {};
    $scope.comments = [];
    $scope.comment = {};
    $scope.hideit = true;
    $scope.hideit2 = true;
    $scope.commentstring = {empty: null};
    $scope.usethisemail = null;
    $scope.showcommentsave = null;

    $scope.usermatchespost = function() {
      if($scope.post.namey === JSON.parse($scope.usethisemail)) {
        return false;
      }
      else {
        return true;
      }
    };

    $scope.loadpost = function() {
      if(Auth.isLoggedIn()) {
        $http.get('/api/users/memail').success(function (data) {
          $scope.usethisemail = data;
        });
      }

      $http.get('/api/posts/'+$routeParams.id).success(function (data) {
        if(data.comments[0] === undefined) {
          $scope.commentstring.empty = 'No comments.';
        }
        $scope.post = data;
        $scope.comments = data.comments;
        
        if($scope.post.comments !== null) {
          for(var y = 0; y<$scope.post.comments.length; y++) {
            if($scope.post.comments[y].namey === JSON.parse($scope.usethisemail)) {
              $scope.post.comments[y].usermatchescomment = false;
            }
            else {
              $scope.post.comments[y].usermatchescomment = true;
            }
          }
        }
      });
    };

    $scope.deleteit = function(data) {
      if(JSON.parse($scope.usethisemail) === data.namey) {
        $http({
            url : '/api/posts/'+data._id,
            method : 'DELETE',
            async : true,
            cache : false,
            headers : { 'Accept' : 'application/json' , 'Pragma':'no-cache'}
          }).success(function() {
              $window.location.href = '/forum';
            });
      }
      else {
        $window.alert('Nice try - but you did not write this post.');
      }
    };

    $scope.editit = function(data) {
      if(JSON.parse($scope.usethisemail) === data.namey) {
        $location.path('/postedit/'+data._id);
      }
      else {
        $window.alert('Nice try - but you did not write this post.');
      }
    };

    function makeid()
    {
        var numbpost = Math.floor(Math.random() * (9999999 + 1));
        $http.get('/api/posts/'+$routeParams.id).success(function (data) {
          for(var u = 0; u<data.comments.length; u++) {
            while(data.comments[u].id === numbpost) {
              numbpost = Math.floor(Math.random() * (9999999 + 1));
            }
          }
        });

        return numbpost;
    }

    $scope.commentonit = function() {
      if(Auth.isLoggedIn()) {
        var holder = JSON.parse($scope.usethisemail);
        var number = makeid();
        var x = new Date().toString();
        var s = x.substring(0, x.indexOf('G'));

        $scope.comment = {showeditbutton: true, checkedit: true, namey: holder, date: s, content: $scope.comment.content, id: number};
        $scope.commentstring.empty = '';
        $scope.post.comments.push($scope.comment);
        $scope.comments = $scope.post.comments;

        Post.update({id:$routeParams.id}, $scope.post);
        
        $scope.comment = null;
      }
      else {
        $window.alert('You need to log in.');
      }
    };

    $scope.toggle = function() {
      if(!Auth.isLoggedIn()) {
        $window.alert('You need to log in.');
      }
      else {
        $scope.hideit = false;
        $scope.$broadcast('event:toggle');
        $scope.$broadcast('event:change');
      }
    };

    $scope.toggley = function() {
      $scope.hideit = true;
      $scope.$broadcast('event:fadein');
      $scope.$broadcast('event:change');
    };

    $scope.fadein = function() {
      if(!Auth.isLoggedIn()) {
        $window.alert('You need to log in.');
      }
      else {
        $scope.$broadcast('event:fadein');
      }
    };

    $scope.toggles = function() {
      $scope.hideit2 = false;
      $scope.$broadcast('event:toggles');
    };

    $scope.deletecomment = function(data) {
      if(JSON.parse($scope.usethisemail) === data.namey) {
        for(var i = 0; i<$scope.comments.length; i++) {
          if(data.id === $scope.comments[i].id) {
            $scope.comments.splice(i, 1);
            $scope.post.comments = $scope.comments;
          }
        }
        $http({url: '/api/posts/'+$routeParams.id, method: 'PUT', data: $scope.post}).
              success(function(data, status, headers, config) {
                //
        }).
          error(function(data, status, headers, config) {
              //
        });
      }
      else {
        $window.alert('Nice try, but you did not write this comment.');
      }
    };

    $scope.commentedit = function(data) {
      $scope.showcommentsave = true;
      $scope.toggles();

      if(JSON.parse($scope.usethisemail) === data.namey) {
        for(var i = 0; i<$scope.comments.length; i++) {
          if(data.id === $scope.comments[i].id) {
            $scope.comment = $scope.comments[i];
            $scope.comment.checkedit = false;
            $scope.comment.showeditbutton = false;
            $scope.comments[i] = $scope.comment;
            $scope.post.comments = $scope.comments;
          }
        }
      }
      else {
        $window.alert('Nice try, but you did not write this comment.');
      }
    };

    $scope.commentsave = function(data) {
      $scope.hideit = true;
      if(JSON.parse($scope.usethisemail) === data.namey) {
        $scope.comment = data;
        $scope.comment.checkedit = true;
        $scope.comment.showeditbutton = true;

        for(var i = 0; i<$scope.comments.length; i++) {
          if(data.id === $scope.comments[i].id) {
            $scope.comments[i] = $scope.comment;
            $scope.comments.splice(i, 1, $scope.comment);
            $scope.post.comments = $scope.comments;
          }
        }

        $http({url: '/api/posts/'+$routeParams.id, method: 'PUT', data: $scope.post}).
          success(function(data, status, headers, config) {
            //
          }).
          error(function(data, status, headers, config) {
            //
          });
      }
      else {
        $window.alert('Nice try, but you did not write this comment.');
      }

      $scope.showcommentsave = false;
      $scope.comment = null;
    };
  })
  .controller('PostEditCtrl', function ($http, $scope, $window, $routeParams, $location) {
    $scope.user = {};
    $scope.errors = {};
    $scope.sendinfo = {};
    $scope.post = {};

    $http.get('/api/users/me').success(function (data) {$scope.user = data;});

    $scope.saveedit = function() {
      if($scope.post.posttitle.length > 40) {
        $window.alert('The title can only be 40 characters.');
      }
      else {
      // Now call update passing in the ID first then the object you are updating
        $http({url: '/api/posts/'+$routeParams.id, method: 'PUT', data: $scope.post}).
          success(function(data, status, headers, config) {
            $location.path('/postview/'+$routeParams.id);
          }).
          error(function(data, status, headers, config) {
            //
          });
      }
    };

    $scope.loadinfo = function() {
      $http.get('/api/posts/'+$routeParams.id).success(function (data) {$scope.post = data;});
    };
  });