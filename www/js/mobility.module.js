(function() {
  'use strict';

  angular.module('mobility', [
    'ionic',
    'ngMaterial',
    'ngCordova',
    'leaflet-directive'
  ])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the
      //   accessory bar above the keyboard for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    // For any unmatched URL, redirect to /home
    $urlRouterProvider.otherwise('/home');
    // Set up states
    $stateProvider
      // .state('splash', {
      //   url: '/splash',
      //   templateUrl: 'templates/splash.html',
      //   controller: 'SplashController',
      //   controllerAs: 'splash'
      // })
      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      });
  });
})();
