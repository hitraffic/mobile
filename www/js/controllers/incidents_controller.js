angular.module('mobility')

.controller('IncidentsController', function($scope, $mdSidenav, Incidents) {
  $scope.incidents = null;
  Incidents.all().then(function (incidents) {
    $scope.incidents = incidents;
  });

  $scope.remove = function(incident) {
    Incidents.remove(incident);
  };

  $scope.searchFilter = function(incident) {
    var regexp = new RegExp($scope.searchValue, 'i');
    if (incident.area && incident.area.search(regexp) !== -1) {
      return true;
    }
    else if (incident.address && incident.address.search(regexp) !== -1) {
      return true;
    }
    else if (incident.location && incident.location.search(regexp) !== -1) {
      return true;
    }
    return false;
  };

  $scope.toggleList = function() {
    $mdSidenav('left').toggle();
  };

  $scope.closeList = function() {
    $mdSidenav('left').close();
  };
});
