angular.module('mobility')

.controller('MapController', function($scope, $stateParams, Incidents) {
  $scope.items = ['A', 'List', 'Of', 'Items', 'From', 'MapController'];
  $scope.incident = Incidents.get($stateParams.incidentId);
});
