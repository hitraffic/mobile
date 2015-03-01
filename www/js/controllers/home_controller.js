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
          minZoom: 3,
          zoomControlPosition: 'topright',
          zoomAnimation: true

        },
        center: {},
        markers : {},
        controls: {
          custom: [
            L.control.locate({ 
              follow: true,
              position: "topright",
            })
          ]
        },
        events: {
          map: {
            enable: ['context'],
            logic: 'emit'
          }
        }
      };

      //bring all incidents into scope
      vm.IncidentsController.getNewIncidents();
      vm.MapController.focusHere(LocationsService);
    });

    /**
     * Center map on specific saved location
     * @param incident
     */
    vm.MapController.focusHere = function (incident) {
      //if incident is starting point (Oahu), zoom out, if not, zoom in more to that location
      if (incident.starting === true) {
        var zoom_level = 11;
      } else {
        var zoom_level = 14;
      }
      
      //if the incident coordinates exist, center the map on that point
      if(incident.lat !== null || incident.lng !== null){
        vm.MapController.map.center  = {
          lat : incident.lat,
          lng : incident.lng,
          zoom : zoom_level
        };
      }

      //If location is associated with a marker, open the popup
      var marker = vm.MapController.findMarker(incident);
      if (marker) {
        marker.focus = true;
      }

      //FIX: Need error message for when there are no coordinates
    };
    
    /**
     * Find marker associated with a specific location
     * @param  {object} incident [incident object]
     * @return {object} marker [marker associated with the location]
     */
    vm.MapController.findMarker = function (incident) {
      var markers_obj = vm.MapController.map.markers;
      for (var marker in markers_obj) {
        if(markers_obj[marker].lat === incident.lat && markers_obj[marker].lng === incident.lng) {
          return  markers_obj[marker];
        }
      }
    }

    vm.MapController.updateMarkers = function (incidents) {
      vm.MapController.map.markers = {};
      var incident_num = 1;
      incidents.forEach(function (incident, index, array) {
        //html for marker message
        var html = "<h5 class='incident_type'>" + incident.type + "</h5>"
          + "<p class='marker_text'>" + incident.date + "</p>"
          + "<p class='marker_text'>" + incident.address + "</p>"
          + "<p class='marker_text'>" + incident.area + "</p>";
          // + "<button class='marker_text zoom' ng-click='focusHere(incident)'>Zoom Here</button>";
        
        //set marker location
        var marker = {
          lat: incident.lat,
          lng: incident.lng,
          message: html,
        }

        //Only add to list of markers if there are coordinates
        if(marker.lat !== null || marker.lng !== null){
          vm.MapController.map.markers["Incident" + incident_num] = marker;
        }
        incident_num++;
      });
    }


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

    vm.IncidentsController.clearSearch = function() {
      vm.IncidentsController.searchValue = '';
    };

    vm.IncidentsController.showClearSearchButton = function() {
      return vm.IncidentsController.searchValue;
    };

    vm.IncidentsController.refreshIncidentsList = function() {
      // Refresh the incidents list and apply new filters
      vm.IncidentsController.getNewIncidents();
      vm.MapController.updateMarkers(vm.incidents)
      .finally(function() {
        // This event must be called to resume normal use of the list
        $scope.$broadcast('scroll.refreshComplete');
        // No need to kick off a digest cycle since we're using a promise
      });
    };

    vm.IncidentsController.getNewIncidents = function () {
      vm.incidents = [];
      IncidentsService.all().then(function (incidents) {
        vm.incidents = incidents;
        vm.MapController.updateMarkers(vm.incidents);
      })
    }

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
      vm.IncidentsController.getNewIncidents();
      vm.modal.hide();
    };

    $scope.$on('$destroy', function() {
      vm.modal.remove();
    });

  }
})();
