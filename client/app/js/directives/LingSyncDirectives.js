console.log("Loading the LingSyncDirectives.");

'use strict';
define(
    [ "angular" ],
    function(angular) {
      var LingSyncDirectives = angular
          .module('LingSync.directives', [])
          .directive('moduleVersion', [ 'version', function(version) {
            return function(scope, element, attrs) {
              element.text(version);
            };
          } ]);

      return LingSyncDirectives;
    });