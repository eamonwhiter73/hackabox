'use strict';

angular.module('hackaboxApp')
  .factory('Post', function ($resource) {
    return $resource('/api/posts/:id', null, {
      'update': { method:'PUT' }
	});
  });