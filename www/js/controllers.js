angular.module('mobility.controllers', [])

.controller('IncidentsCtrl', function($scope, Incidents) {
  $scope.incidents = Incidents.all();
  $scope.remove = function(incident) {
    Incidents.remove(incident);
  };
})

.controller('IncidentDetailCtrl', function($scope, $stateParams, Incidents) {
  $scope.incident = Incidents.get($stateParams.incidentId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableLocationServices: true
  };
});
