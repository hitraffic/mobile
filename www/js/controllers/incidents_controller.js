angular.module('mobility')

.controller('IncidentsController', function($scope, Incidents) {
  $scope.things = ['A', 'Set', 'Of', 'Things', 'From', 'IncidentsController'];
  $scope.incidents = Incidents.all();
  $scope.remove = function(incident) {
    Incidents.remove(incident);
  };
});
