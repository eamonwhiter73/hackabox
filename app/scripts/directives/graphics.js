'use strict';

  /**
   * Removes server error when user updates input
   */
angular.module('hackaboxApp')
  .directive('toggles', function() {
    return function(scope, elem, attrs) {
      scope.$on('event:toggles', function() {
        elem.slideToggle();
      });
    };
  })
  .directive('change', function() {
    return function(scope, elem, attrs) {
      scope.$on('event:change', function() {
        if(elem.html() === 'Comment') {
          elem.html('Hide comment');
        }
        else {
          elem.html('Comment');
        }
      });
    };
  })
  .directive('edit', function() {
    return function(scope, elem, attrs) {
      scope.$on('event:edit', function() {
        elem.html('');
      });
    };
  });