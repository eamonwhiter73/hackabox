'use strict';

angular.module('hackaboxApp')
  .controller('NavbarCtrl', function ($rootScope, $scope, $location, Auth) {
    $scope.isusedvar;

    $scope.isusedvar2;

    $scope.menu = [{
      'title': 'Home',
      'link': '/',
      'run': 'home'
    }, {
      'title': 'Forum',
      'link': '/forum',
      'run': 'forum'
    }];
    
    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.senditout = function() {
      $rootScope.$broadcast('event:senditout');
    }

    $scope.senditout2 = function() {
      $rootScope.$broadcast('event:senditout2');
    }

    $scope.spin = function(item) {
      if(item.run === 'home') {
        console.log($scope.isusedvar);
        console.log('in isused');
        $scope.isusedvar = true;
        $rootScope.$broadcast('event:spin');
        //$rootScope.$broadcast('event:spinwork');
      }
      else if(item.run === 'forum') {
        console.log('in forum');
        $scope.isusedvar = false;
        $rootScope.$broadcast('event:spinforum');
      }
      else {
        console.log('got here :(');
      }
    }

    /*$scope.isused = function() {
      console.log('in isused');
      $scope.isusedvar = true;
      $scope.isusedvar2 = false;
      $rootScope.$broadcast('event:spin');
    };

    $scope.isused2 = function() {
      $scope.isusedvar2 = true;
      $scope.isusedvar = false;
      $rootScope.$broadcast('event:spinforum');
    }

    $scope.spin = function() {
      $scope.isused = true;
      $rootScope.$broadcast('event:spin');
    }

    $scope.forum = function() {
      $scope.isused = false;
      $rootScope.$broadcast('event:spinforum');
    }*/
  });
