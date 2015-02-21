// angular.module is a global place for creating, registering and retrieving Angular modules
angular.module('mobility', [
  'ionic',
  'ngMaterial'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
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
  // For any unmatched URL, redirect to /home/map
  $urlRouterProvider.otherwise('/home/map');
  // Set up states
  $stateProvider
    .state('splash', {
      url: '/splash',
      templateUrl: 'templates/splash.html',
      controller: 'SplashController'
    })
    .state('home', {
      url: '/home',
      abstract: true,
      templateUrl: 'templates/home.html'
    })
    .state('home.map', {
      url: '/map',
      templateUrl: 'templates/home.map.html',
      controller: 'MapController'
    })
    .state('home.incidents', {
      url: '/incidents',
      templateUrl: 'templates/home.incidents.html',
      controller: 'IncidentsController'
    })
    .state('home.settings', {
      url: '/settings',
      templateUrl: 'templates/home.settings.html',
      controller: 'SettingsController'
    });
});
