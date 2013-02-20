console.log("Loading the LingSyncServices.");

'use strict';
define([ "angular" ], function(angular) {
  var LingSyncServices = angular.module('LingSync.services', [ 'ngResource' ]);
  
  return LingSyncServices;
});