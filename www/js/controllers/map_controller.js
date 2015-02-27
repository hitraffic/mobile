angular.module('mobility').controller('MapController', function(
  $scope,
  $cordovaGeolocation,
  $stateParams,
  $ionicModal,
  $ionicPopup,
  $compile,
  $mdSidenav,
  LocationsService,
  InstructionsService,
  Incidents
  ) {


    $scope.MapController = {};
    $scope.IncidentController = {};

    // Once state loaded, put map on scope.
    $scope.$on("$stateChangeSuccess", function() {

      //Initialize map properties
      $scope.map = {
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
      $scope.incidents = [];
      Incidents.all().then(function (incidents) {
        // console.log(incidents);
        $scope.incidents = incidents;
        var incident_num = 1; 
        $scope.incidents.forEach(function (incident, index, array) {
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
            $scope.map.markers["Incident" + incident_num] = marker;
          }
          incident_num++;
        });
        $scope.MapController.focusHere(LocationsService);
      });;

    });



    /**
     * Center map on specific saved location
     * @param locationKey
     */
    $scope.MapController.focusHere = function(incident) {
      //if incident is starting point (Oahu), zoom out, if not, zoom in more to that location
      if (incident.starting === true) {
        var zoom_level = 11;
      } else {
        var zoom_level = 14;
      }

      //set map center
      $scope.map.center  = {
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

    $scope.IncidentController.toggleList = function() {
      $mdSidenav('left').toggle();
    };

    $scope.IncidentController.closeList = function() {
      $mdSidenav('left').close();
    };

    $scope.IncidentController.remove = function(incident) {
      Incidents.remove(incident);
    };

    $scope.IncidentController.searchFilter = function(incident) {
      var regexp = new RegExp($scope.searchValue, 'i');
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

  });