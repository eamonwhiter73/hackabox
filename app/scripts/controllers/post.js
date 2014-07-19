'use strict';

angular.module('hackaboxApp')
  .controller('PostCtrl', function ($http, $scope, $window, $routeParams, $location, $rootScope) {
    $scope.user = {};
    $scope.errors = {};
    $scope.sendinfo = {};
    $scope.post = {};
    $scope.post.comments = [];
    $scope.comment = {};
    $scope.comments = [];
    $scope.hideit = true;
    $scope.hideit2 = true;

    $scope.loadpost = function() {
      //$scope.init = true;
      //$('.commentonit').hide();
      //$(".jumbotroncomment").hide();
      $http.get('/api/posts/'+$routeParams.id).success(function (data) {
        $scope.post = data;
        //console.log($scope.post.comments[0]);
        $scope.comments = $scope.post.comments;
        console.log('this is scope comments ' + $scope.comments);
        if($scope.comments[0] !== undefined) {
          $scope.commentstring.empty = '';
        }
      });
    };

    $scope.loadpost();

    $scope.commentstring = {empty: 'No comments'};

    $http.get('/api/users/me').success(function (data) {$scope.user = data;});

    $scope.postit = function() {
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
            console.log('this worked for some reason');
            $window.location.href = '/forum';
          });
    };

    /*$scope.loadpost2 = function() {
      $http({
          url : '/api/posts/'+$routeParams.id,
          method : 'GET',
          
          headers : { 'Accept' : 'application/json' , 'Pragma':'no-cache'}
      }).success(function(data) {
         //console.log("this worked for some reason");
         $scope.post = data;
         $scope.comments = $scope.post.comments;
      });
    };*/

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
              console.log('this worked for deleting');
              $window.location.href = '/forum';
            });
      }
      else {
        console.log('uh oh a boo boo');
        $window.alert('Nice try - but you did not write this post.');
      }
    };

    $scope.editit = function(data) {
      if($scope.user.email === data.username) {
        $location.path('/postedit/'+data._id);
      }
      else {
        $window.alert('Nice try - but you did not write this post.');
      }
    };

    $scope.commentonit = function() {
      //$scope.toggle();
      console.log($scope.user.email +  'this is user email as retrieved');
      if($scope.user.email !== null) {
        //$http.get('/api/users/me').success(function (data) {$scope.user = data});
        //$(".jumbotroncomment").show();
        $scope.comment = {showeditbutton: true, checkedit: true, username: $scope.user.email, date: null, content: $scope.comment.content, id:  Math.floor((Math.random() * 999999999) + 1)};
        $scope.comment.date = new Date().toString();
        $scope.commentstring.empty = '';
        /*$scope.comment.date = new Date().toString();*/
        $scope.comments.push($scope.comment);
        $scope.post.comments = $scope.comments;
        $scope.comment = null;
        //Post.update({ id:$scope.post._id }, $scope.post, function() {});
        //$(".commentonit").hide();
        //$scope.comment = null;
      }
      else {
        $window.alert('You need to log in.');
      }
      $http({url: '/api/posts/'+$routeParams.id, method: 'PUT', data: $scope.post}).
        success(function(data, status, headers, config) {
          console.log('this put');
          // this callback will be called asynchronously
          // when the response is available
        }).
        error(function(data, status, headers, config) {
          console.log(data);
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    };

    /*$scope.comment = function() {
      //Graphics.slideToggle("commentonit");
    };*/

    $scope.toggle = function() {
      $scope.hideit = false;
      $scope.$broadcast('event:toggle');
      $scope.$broadcast('event:change');
    };

    $scope.toggles = function() {
      $scope.hideit2 = false;
      $scope.$broadcast('event:toggles');
      //$scope.$broadcast('event:change');
    };

    $scope.deletecomment = function(data) {
      if($scope.user.email === data.username) {
        for(var i = 0; i<$scope.comments.length; i++) {
          if(data.id === $scope.comments[i].id) {
            $scope.comments.splice(i, 1);
            $scope.post.comments = $scope.comments;
          }
        }
        $http({url: '/api/posts/'+$routeParams.id, method: 'PUT', data: $scope.post}).
              success(function(data, status, headers, config) {
                //console.log('this put');
                // this callback will be called asynchronously
                // when the response is available
        }).
          error(function(data, status, headers, config) {
              //console.log(data);
              // called asynchronously if an error occurs
              // or server returns response with an error status.
        });
      }
      else {
        $window.alert('Nice try, but you did not write this comment.');
      }
    };

    $scope.commentedit = function(data) {
      $scope.toggles();
      //$scope.loadpost2();
      if($scope.user.email === data.username) {
        console.log(data.id + ' this is data.id from form');
        for(var i = 0; i<$scope.comments.length; i++) {
          if(data.id === $scope.comments[i].id) {
            $scope.comment = $scope.comments[i];
            //var genius = i;
            $scope.comment.checkedit = false;
            $scope.comment.showeditbutton = false;
            $scope.comments[i] = $scope.comment;
            //$scope.comments.splice(i, 0, $scope.comment);
            $scope.post.comments = $scope.comments;
          }
        }
        /*$http({method: 'PUT', url: '/api/posts/'+$routeParams.id, data: $scope.post}).
          success(function(data, status, headers, config) {
            console.log('this put');
            // this callback will be called asynchronously
            // when the response is available
          }).
          error(function(data, status, headers, config) {
            console.log(data);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });*/
        //$rootScope.$broadcast('event:edit', data);
        //$rootScope.$broadcast('event:done', data);
      }
      else {
        $window.alert('Nice try, but you did not write this comment.');
      }
    };

    $scope.commentsave = function(data) {
      $scope.hideit = true;
      //$scope.checkedit = false;
      if($scope.user.email === data.username) {
        console.log(data.content);
        /*$scope.comment.content = data.content;
        $scope.comment.id = data.id;
        $scope.comment.username = data.username;
        $scope.comment.date = data.date;
        $scope.comment.checkedit = false;*/
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
            console.log('this put');
            $scope.comment = null;
            // this callback will be called asynchronously
            // when the response is available
          }).
          error(function(data, status, headers, config) {
            console.log(data);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      }
      else {
        $window.alert('Nice try, but you did not write this comment.');
      }
    };
  })
  .controller('PostEditCtrl', function ($http, $scope, $window, $routeParams, $location) {
    $scope.user = {};
    $scope.errors = {};
    $scope.sendinfo = {};
    $scope.post = {};

    $http.get('/api/users/me').success(function (data) {$scope.user = data;});

    $scope.saveedit = function() {
      console.log($scope.post._id + ' post id');
      // Now call update passing in the ID first then the object you are updating
      $http({url: '/api/posts/'+$routeParams.id, method: 'PUT', data: $scope.post}).
        success(function(data, status, headers, config) {
          console.log('this put');
          $location.path('/postview/'+$routeParams.id);
          // this callback will be called asynchronously
          // when the response is available
        }).
        error(function(data, status, headers, config) {
          console.log(data);
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    };

    $scope.loadinfo = function() {
      $http.get('/api/posts/'+$routeParams.id).success(function (data) {$scope.post = data;});
    };
  });