console.log("Loading the LingSyncFilters.");

'use strict';
define([ "angular" ], function(angular) {
	var LingSyncFilters = angular.module('LingSync.filters', []).filter('standardDate', function() {
    return function(input) {
      var newDate = input.replace(/\"/g,"");
      var d = new Date(newDate);
      var t = new Date(newDate);
      return d.toLocaleDateString() + " " + t.toLocaleTimeString();
    };
  });
	return LingSyncFilters;
});