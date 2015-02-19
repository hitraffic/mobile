angular.module('mobility.controllers.settings', [])

.controller('SettingsController', function($scope) {
  $scope.settingsText = 'Settings Page';
  $scope.settings = {
    enableLocationServices: true
  };
});
