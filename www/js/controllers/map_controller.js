angular.module('mobility')

.controller('MapController', function($scope, $stateParams, Incidents) {
  $scope.incident = Incidents.get($stateParams.incidentId);
  
});
