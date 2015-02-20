angular.module('mobility')

.controller('SettingsController', function($scope) {
  $scope.settingsText = 'Settings Page';
  $scope.settings = {
    enableLocationServices: true
  };
});
