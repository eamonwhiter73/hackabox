'use strict';

angular.module('hackaboxApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'partials/signup',
        controller: 'SignupCtrl'
      })
      .when('/settings', {
        templateUrl: 'partials/settings',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .when('/forum', {
        templateUrl: 'partials/forum',
        controller: 'ForumCtrl'
      })
      .when('/createpost', {
        templateUrl: 'partials/createpost',
        controller: 'CreatePostCtrl',
        authenticate: true
      })
      .when('/postedit/:id', {
        templateUrl: 'partials/postedit',
        controller: 'PostEditCtrl',
        authenticate: true
      })
      .when('/postview/:id', {
        templateUrl: 'partials/postview',
        controller: 'PostCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
      
    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $location, Auth) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      
      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }
    });
  })
  .directive('toggle', function($animate) {
    return function(scope, elem, attrs) {
      scope.$on('event:toggle', function() {
        elem.slideToggle();
        if(elem.hasClass('css-class')) {
          $animate.removeClass(elem, 'css-class');
        } else {
          $animate.addClass(elem, 'css-class');
        }
      });
    };
  })
  .directive('fadein', function($animate) {
    return function(scope, elem, attrs) {
      scope.$on('event:fadein', function() {
        if(elem.hasClass('css-class')) {
          $animate.removeClass(elem, 'css-class');
        } else {
          $animate.addClass(elem, 'css-class');
        }
      });
    };
  })
  .directive('spin', function($location, $animate) {
    return function(scope, elem, attrs) {
      if($location.path() === '/') {
        if(elem.hasClass('onitsown-add')) {
          $animate.removeClass(elem, 'onitsown-add')
        }
        $animate.addClass(elem, 'onitsown-add');
        scope.$on('event:spin', function() {
          if(elem.hasClass('onitsown-add')) {
            $animate.removeClass(elem, 'onitsown-add')
          }
          $animate.addClass(elem, 'onitsown-add');
          /*console.log('in event:spin');
          if(elem.hasClass('onitsown-add')) {
            $animate.removeClass(elem, 'onitsown-add')
          }
          $animate.addClass(elem, 'onitsown-add');*/
        });
      }
      else {
        if(elem.hasClass('onitsown-add')) {
          $animate.removeClass(elem, 'onitsown-add')
        }
        elem.addClass('onitsown');
      }
    };
  })
  .directive('spinwork', function($animate) {
    return function(scope, elem, attrs) {
      scope.$on('event:spinwork', function() {
        //elem.append('');
      })
    };
  })
  .directive('forum', function($location, $animate) {
    return function(scope, elem, attrs) {
      if($location.path() === '/forum' || $location.path().indexOf('postview') > -1 || $location.path().indexOf('postedit') > -1 || $location.path().indexOf('createpost') > -1) {
        if(elem.hasClass('onitsown-add-forum')) {
          $animate.removeClass(elem, 'onitsown-add-forum')
        }
        $animate.addClass(elem, 'onitsown-add-forum');
        scope.$on('event:spinforum', function() {
          if(elem.hasClass('onitsown-add-forum')) {
            $animate.removeClass(elem, 'onitsown-add-forum')
          }
          $animate.addClass(elem, 'onitsown-add-forum');
          /*if(elem.hasClass('onitsown-add-forum')) {
            $animate.removeClass(elem, 'onitsown-add-forum')
          }
          $animate.addClass(elem, 'onitsown-add-forum');
          /*if(elem.prev().hasClass('onitsown-add')) {
            $animate.removeClass(elem.prev(), 'onitsown-add');
          }*/
        })
      }
      else {
         if(elem.hasClass('onitsown-add-forum')) {
          $animate.removeClass(elem, 'onitsown-add-forum')
        }
        elem.addClass('onitsown2');
      }
    };
  })
  .directive('senditout', function($location, $animate) {
    return function(scope, elem, attrs) {
      if($location.path() === '/login') {
        if(elem.hasClass('onitsown-add-login')) {
          $animate.removeClass(elem, 'onitsown-add-login')
        }
        $animate.addClass(elem, 'onitsown-add-login');
        scope.$on('event:senditout', function() {
          if(elem.hasClass('onitsown-add-login')) {
            $animate.removeClass(elem, 'onitsown-add-login')
          }
          $animate.addClass(elem, 'onitsown-add-login');
          /*if(elem.hasClass('onitsown-add-forum')) {
            $animate.removeClass(elem, 'onitsown-add-forum')
          }
          $animate.addClass(elem, 'onitsown-add-forum');
          /*if(elem.prev().hasClass('onitsown-add')) {
            $animate.removeClass(elem.prev(), 'onitsown-add');
          }*/
        })
      }
      else {
         if(elem.hasClass('onitsown-add-login')) {
          $animate.removeClass(elem, 'onitsown-add-login')
        }
        elem.addClass('onitsown3');
      }
    };
  })
  .directive('senditout2', function($location, $animate) {
    return function(scope, elem, attrs) {
      if($location.path() === '/signup') {
        if(elem.hasClass('onitsown-add-signup')) {
          $animate.removeClass(elem, 'onitsown-add-signup')
        }
        $animate.addClass(elem, 'onitsown-add-signup');
        scope.$on('event:senditout2', function() {
          if(elem.hasClass('onitsown-add-signup')) {
            $animate.removeClass(elem, 'onitsown-add-signup')
          }
          $animate.addClass(elem, 'onitsown-add-signup');
          /*if(elem.hasClass('onitsown-add-forum')) {
            $animate.removeClass(elem, 'onitsown-add-forum')
          }
          $animate.addClass(elem, 'onitsown-add-forum');
          /*if(elem.prev().hasClass('onitsown-add')) {
            $animate.removeClass(elem.prev(), 'onitsown-add');
          }*/
        })
      }
      else {
         if(elem.hasClass('onitsown-add-signup')) {
          $animate.removeClass(elem, 'onitsown-add-signup')
        }
        elem.addClass('onitsown4');
      }
    };
  });