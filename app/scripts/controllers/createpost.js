'use strict';

angular.module('hackaboxApp')
  .controller('CreatePostCtrl', function ($http, $scope, $window, $routeParams, $location) {
    $scope.user = {};
    $scope.errors = {};
    $scope.post = {};

    $http.get('/api/users/me').success(function (data) {$scope.user = data;});

    function makeidforpost() {
      var numbpost = Math.floor(Math.random() * (9999999 + 1));
      $http.get('/api/posts/').success(function (data) {
        for(var u = 0; u<data.length; u++) {
          while(data[u]._id === numbpost) {
            numbpost = Math.floor(Math.random() * (9999999 + 1));
          }
        }
        return numbpost;
      });
    }

    $scope.postit = function() {
      var holder = $scope.user.email;
      var x = new Date().toString();
      var s = x.substring(0, x.indexOf('G'));

      if($scope.post.posttitle.length > 40) {
        $window.alert('The title can only be 40 characters.');
      }
      else {
      
        var sendinfo = {
          _id: makeidforpost(),
          posttitle: $scope.post.posttitle,
          content: $scope.post.content,
          namey: holder,
          date: s,
          comments: $scope.post.comments
        };

        $http({
            url : '/api/posts',
            method : 'POST',
            async : true,
            cache : false,
            headers : { 'Accept' : 'application/json' , 'Pragma':'no-cache'},
            data : sendinfo
          }).success(function() {
              $scope.post = null;
              $location.path('/forum');
            });
      }
    };
  });