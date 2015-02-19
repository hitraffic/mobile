angular.module('mobility.controllers', [])

.controller('SplashController', function($scope, Incidents) {
  $scope.splashText = 'Splash Page';
  $scope.incidents = Incidents.all();
  $scope.remove = function(incident) {
    Incidents.remove(incident);
  };
})

.controller('MapController', function($scope, $stateParams, Incidents) {
  $scope.items = ['A', 'List', 'Of', 'Items', 'From', 'MapController'];
  $scope.incident = Incidents.get($stateParams.incidentId);
})

.controller('IncidentsController', function($scope) {
  $scope.things = ['A', 'Set', 'Of', 'Things', 'From', 'IncidentsController'];
})

.controller('SettingsController', function($scope) {
  $scope.settingsText = 'Settings Page';
  $scope.settings = {
    enableLocationServices: true
  };
});

// .controller('IncidentsCtrl', function($scope, Incidents) {
//   $scope.incidents = Incidents.all();
//   $scope.remove = function(incident) {
//     Incidents.remove(incident);
//   };
// })

// .controller('IncidentDetailCtrl', function($scope, $stateParams, Incidents) {
//   $scope.incident = Incidents.get($stateParams.incidentId);
// })

// .controller('AccountCtrl', function($scope) {
//   $scope.settings = {
//     enableLocationServices: true
//   };
// });
