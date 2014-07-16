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
  /*.directive('edit', function() {
    return function(scope, elem, attrs) {
        scope.$on('event:edit', function() {
           var store = elem.html();
           elem.html("<textarea id='editcommentplace' class='form-control' name='comments' ng-model='comment.content' required>" + store + "</textarea>" );
        });
    };
  })*/
  .directive('done', function() {
    return function(scope, elem, attrs) {
      scope.$on('event:done', function(event, x) {
        //$scope.post.comments = x;
        console.log(x + " this is x");
      });
    }
  })