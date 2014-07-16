'use strict';

angular.module('hackaboxApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
