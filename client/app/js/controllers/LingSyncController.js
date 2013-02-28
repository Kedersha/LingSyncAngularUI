console.log("Loading the LingSyncController.");

'use strict';
define([ "angular" ], function(angular) {
  var LingSyncController = function($scope, $resource, LingSyncData) {

    // CONTROLLER CODE
    $scope.template = "template2";

    var DB = "lingsync1";

    $scope.orderProp = "dateModified";

    $scope.reverse = true;

    $scope.fields = {
      "field1" : {
        "label" : "utterance",
        "title" : "Utterance"
      },
      "field2" : {
        "label" : "morphemes",
        "title" : "Morphemes"
      },
      "field3" : {
        "label" : "gloss",
        "title" : "Gloss"
      },
      "field4" : {
        "label" : "translation",
        "title" : "Translation"
      },
      "field5" : {
        "label" : "notes",
        "title" : "Notes"
      }
    };

    $scope.selected = 'newEntry';

    // Fetch data from server and put into template scope
    function loadData() {
      LingSyncData.async(DB, $scope.template).then(function(fieldData) {
        var scopeData = [];
        for ( var i = 0; i < fieldData.length; i++) {
          scopeData[i] = {};
          var newField;
          for ( var j = 0; j < fieldData[i].value.datumFields.length; j++) {
            newField = fieldData[i].value.datumFields[j].label;
            scopeData[i][newField] = fieldData[i].value.datumFields[j].value;
          }
          scopeData[i].dateModified = fieldData[i].value.dateModified;
        }

        $scope.data = scopeData;
      });
    }

    loadData();
    $scope.saveNew = function(fieldData) {
      // Get blank template to build new record
      LingSyncData.blankTemplate().then(function(newRecord) {
        for (dataKey in fieldData) {
          for (fieldKey in $scope.fields) {
            if (dataKey == fieldKey) {
              var newDataKey = $scope.fields[fieldKey].label;
              fieldData[newDataKey] = fieldData[dataKey];
              delete fieldData[dataKey];
            }
          }
        }

        // Populate new record with fields from scope
        for ( var i = 0; i < newRecord.datumFields.length; i++) {
          for (key in fieldData) {
            if (newRecord.datumFields[i].label == key) {
              newRecord.datumFields[i].value = fieldData[key];
            }
          }
        }
        newRecord.dateEntered = new Date();
        newRecord.dateModified = new Date();
        LingSyncData.saveNew(DB, $scope.template, newRecord).then(function(savedRecord) {
          // Update UI with updated corpus
          loadData();
        });

      });
    };

    $scope.selectRow = function(datum) {
      $scope.selected = datum;
    };
  };
  LingSyncController.$inject = [ '$scope', '$resource', 'LingSyncData' ];
  return LingSyncController;
});