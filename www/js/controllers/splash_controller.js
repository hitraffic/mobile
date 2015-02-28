(function() {
  'use strict';

  angular
    .module('mobility')
    .controller('SplashController', SplashController);

  SplashController.$inject = ['$scope'];

  function SplashController($scope) {
    var vm = this;
    vm.splashText = 'Splash Page';
  }

})();
