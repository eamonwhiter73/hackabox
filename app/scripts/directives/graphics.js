'use strict';

angular.module('hackaboxApp')

  /**
   * Removes server error when user updates input
   */
  .directive('toggle', function() {
    return function(scope, elem, attrs) {
      scope.$on('event:toggle', function() {
        elem.slideToggle();
      });
    };
  })
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
  })
  .directive('jumbo', function() {
    return function(scope, elem, attrs) {
      scope.$on('event:jumbo', function() {
        elem.html('<div class="nocomments">No comments</div>');
      });
    };
  });