angular.module('mobility')

.controller('SettingsController', function($scope, $ionicModal, Settings) {
  $scope.settings = {
    enableLocationServices: true
  };

  $scope.preferredTypes = Settings.getTypes();

  $scope.preferredAreas = Settings.getAreas();

  $ionicModal.fromTemplateUrl('settings-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.toggleSettings = function() {
    $scope.modal.show();
  };

  $scope.closeSettings = function() {
    Settings.setTypes($scope.preferredTypes);
    Settings.setAreas($scope.preferredAreas);
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
});
