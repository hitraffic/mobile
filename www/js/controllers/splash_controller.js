(function() {
  'use strict';

  angular
    .module('mobility')
    .controller('SplashController', SplashController);

  function SplashController() {
    var vm = this;
    vm.splashText = 'Splash Page';
  }

})();
