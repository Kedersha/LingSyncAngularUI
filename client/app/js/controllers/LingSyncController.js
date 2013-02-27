console.log("Loading the LingSyncController.");

'use strict';
define([ "angular" ], function(angular) {
  var LingSyncController = function($scope, $resource, LingSyncData) {

	  //CONTROLLER CODE
	  $scope.template = "template2";
	  
	  var DB = "lingsync1";
	  
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
	  
	  LingSyncData.async(DB, $scope.template).then(function(fieldData) {
		  var scopeData = [];
		  for (var i = 0; i < fieldData.length; i++) {
			  scopeData[i] = {};
			  var newField;
			  for (var j = 0; j < fieldData[i].value.length; j++) {
				  newField = fieldData[i].value[j].label;
				  scopeData[i][newField] = fieldData[i].value[j].value;
			  }
		  }
		  
		  $scope.data = scopeData;
	  });
	  
	  
	  $scope.testFunction = function(fieldData) {
		  for (dataKey in fieldData) {
			  for (fieldKey in $scope.fields) {
				  if (dataKey == fieldKey) {
					  var newDataKey = $scope.fields[fieldKey].label;
					  fieldData[newDataKey] = fieldData[dataKey];
					  delete fieldData[dataKey];
				  }
			  }
		  }
		  window.alert(JSON.stringify(fieldData));
	  };
	  
	  $scope.selectRow = function(datum) {
		  $scope.selected = datum;
	  };
  };
  LingSyncController.$inject = [ '$scope', '$resource', 'LingSyncData' ];
  return LingSyncController;
});