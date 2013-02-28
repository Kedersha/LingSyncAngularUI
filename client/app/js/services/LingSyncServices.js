console.log("Loading the LingSyncServices.");

'use strict';
define([ "angular" ], function(angular) {
  var LingSyncServices = angular.module('LingSync.services', [ 'ngResource' ])
      .factory(
          'LingSyncData',
          function($http) {
            return {
              'async' : function(DB, template) {
                var couchInfo = "https://senhorzinho.iriscouch.com/" + DB
                    + "/_design/data/_view/" + template + "?bygroup=true";
                console.log("Contacting the DB to get LingSync data "
                    + couchInfo);
                var promise = $http.get(couchInfo).then(function(response) {
                  console.log("Receiving LingSync data results ");
                  return response.data.rows;
                });
                return promise;
              },
              'saveNew' : function(DB, template, newRecord) {
                var couchInfo = "https://senhorzinho.iriscouch.com/" + DB;
                console.log("Contacting the DB to save new record. "
                    + couchInfo);
                var promise = $http.post(couchInfo, newRecord).then(function(response) {
                  return response;
                });
                return promise;
              },
              'blankTemplate' : function() {
                var promise = $http.get('data/blank_template.json').then(function(response) {
                  return response.data;
                });
                return promise;
              }
            };
          });
  return LingSyncServices;
});