'use strict';

angular.module('hackaboxApp')
  .controller('ForumCtrl', function ($http, $scope, $window, $location) {
    $scope.user = {};
    $scope.posts = null;

    $http.get('/api/users/me').success(function (user) {$scope.user = user;});

    $scope.viewpost = function(data) {
      $location.path('/postview/'+data._id);
    };

    $scope.loadposts = function() {
      $http.get('/api/posts').success(function (data) {$scope.posts = data;});
    };
  });