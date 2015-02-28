(function() {
  'use strict';

  angular
    .module('mobility')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope',
    '$cordovaGeolocation',
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    '$compile',
    '$mdSidenav',
    'LocationsService',
    'InstructionsService',
    'IncidentsService',
    'SettingsService'];

  function HomeController($scope,
    $cordovaGeolocation,
    $stateParams,
    $ionicModal,
    $ionicPopup,
    $compile,
    $mdSidenav,
    LocationsService,
    InstructionsService,
    IncidentsService,
    SettingsService) {

    var vm = this;

    vm.MapController = {};
    vm.IncidentsController = {};
    vm.SettingsController = {};

    // Once state loaded, put map on scope.
    $scope.$on("$stateChangeSuccess", function() {

      //Initialize map properties
      vm.MapController.map = {
        defaults: {
          tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
          maxZoom: 18,
          zoomControlPosition: 'topright'
        },
        center: {},
        markers : {},
        events: {
          map: {
            enable: ['context'],
            logic: 'emit'
          }
        }
      };

      //bring all incidents into scope
      //FIX: Create function to continually check for updates to HITraffic API
      vm.incidents = [];
      IncidentsService.all().then(function (incidents) {
        vm.incidents = incidents;
        var incident_num = 1;
        vm.incidents.forEach(function (incident, index, array) {
          var html = "<h5 class='incident_type'>" + incident.type + "</h5>"
            + "<p class='marker_text'>" + incident.date + "</p>"
            + "<p class='marker_text'>" + incident.address + "</p>"
            + "<p class='marker_text'>" + incident.area + "</p>";
            // + "<a class='marker_text zoom' on-tap='focusHere(incident)'>Zoom Here</a>";
          var marker = {
            lat: incident.lat,
            lng: incident.lng,
            // getMessageScope: function () { return $scope; },
            message: html,
            // compileMessage: true
          }
          //Only add to list of markers if there are coordinates
          if(marker.lat !== null || marker.lng !== null){
            vm.MapController.map.markers["Incident" + incident_num] = marker;
          }
          incident_num++;
        });
        vm.MapController.focusHere(LocationsService);
      });;

    });

    /**
     * Center map on specific saved location
     * @param locationKey
     */
    vm.MapController.focusHere = function(incident) {
      //if incident is starting point (Oahu), zoom out, if not, zoom in more to that location
      if (incident.starting === true) {
        var zoom_level = 11;
      } else {
        var zoom_level = 14;
      }

      //set map center
      vm.MapController.map.center  = {
        lat : incident.lat,
        lng : incident.lng,
        zoom : zoom_level
      };
    };

    /**
     * Center map on user's current position
     */
    // $scope.locate = function(){

    //   $cordovaGeolocation
    //     .getCurrentPosition()
    //     .then(function (position) {
    //       $scope.map.center.lat  = position.coords.latitude;
    //       $scope.map.center.lng = position.coords.longitude;
    //       $scope.map.center.zoom = 15;

    //       $scope.map.markers.now = {
    //         lat:position.coords.latitude,
    //         lng:position.coords.longitude,
    //         message: "You Are Here",
    //         focus: true,
    //         draggable: false
    //       };

    //     }, function(err) {
    //       // error
    //       console.log("Location error!");
    //       console.log(err);
    //     });

    // };


    // Incidents Controller

    vm.IncidentsController.toggleList = function() {
      $mdSidenav('left').toggle();
    };

    vm.IncidentsController.closeList = function() {
      $mdSidenav('left').close();
    };

    vm.IncidentsController.searchFilter = function(incident) {
      var regexp = new RegExp(vm.IncidentsController.searchValue, 'i');
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


    // Settings Controller

    vm.SettingsController.settings = {
      enableLocationServices: true
    };

    $ionicModal.fromTemplateUrl('settings-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      vm.modal = modal;
    });

    vm.SettingsController.toggleSettings = function() {
      // Retrieve user settings
      vm.SettingsController.preferredTypes = SettingsService.getTypes();
      vm.SettingsController.preferredAreas = SettingsService.getAreas();
      vm.modal.show();
    };

    vm.SettingsController.closeSettings = function() {
      vm.modal.hide();
    };

    vm.SettingsController.saveSettings = function() {
      // Save user settings
      SettingsService.setTypes(vm.SettingsController.preferredTypes);
      SettingsService.setAreas(vm.SettingsController.preferredAreas);
      // Reload the incidents list and apply new filters
      vm.incidents = [];
      IncidentsService.all().then(function (incidents) {
        vm.incidents = incidents;
      });
      vm.modal.hide();
    };

    $scope.$on('$destroy', function() {
      vm.modal.remove();
    });

  }
})();
