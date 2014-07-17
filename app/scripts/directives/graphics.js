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
  .directive('change', function() {
    return function(scope, elem, attrs) {
        scope.$on('event:change', function() {
            if(elem.html() === "Comment") {
              elem.html("Hide comment");
            }
            else {
              elem.html("Comment");
            }
        });
    };
  })
  .directive('edit', function() {
    return function(scope, elem, attrs) {
        scope.$on('event:edit', function() {
          elem.html("");
        });
    };
  })
  /*.directive('done', function() {
    return function(scope, elem, attrs) {
      scope.$on('event:done', function(event, x) {
        elem.append("<button ng-click='commentsave(comment)''>Save comment</button>")
      });
    }
  })*/