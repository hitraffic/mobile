angular.module('mobility')

.controller('IncidentsController', function($scope, $mdSidenav, Incidents) {
  $scope.incidents = Incidents.all();
  $scope.remove = function(incident) {
    Incidents.remove(incident);
  };

  $scope.toggleList = function() {
    $mdSidenav('left').toggle();
  };

  $scope.closeList = function() {
    $mdSidenav('left').close();
  };
});
