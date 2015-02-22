angular.module('mobility').controller('MapController', function(
  $scope,
  $cordovaGeolocation,
  $stateParams,
  $ionicModal,
  $ionicPopup,
  $compile,
  LocationsService,
  InstructionsService,
  Incidents
  ) {
    /**
     * Once state loaded, get put map on scope.
     */
    $scope.$on("$stateChangeSuccess", function() {

      //Initialize map properties
      $scope.map = {
        defaults: {
          tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
          maxZoom: 18,
          zoomControlPosition: 'bottomleft'
        },
        markers : {},
        events: {
          map: {
            enable: ['context'],
            logic: 'emit'
          }
        }
      };
      //bring all incidents into scope
      $scope.incidents = Incidents.all();
      var incident_num = 1; 
      $scope.incidents.forEach(function (incident, index, array) {
        var html = "<h5 class='incident_type'>" + incident.type + "</h5>"
          + "<p>Area: " + incident.area + "</p>"
          + "<p>Address: " + incident.address + "</p>";
        var marker = {
          lat: incident.lat,
          lng: incident.lng,
          message: html
        }
        //Only add to list of markers if there are coordinates
        if(marker.lat !== null || marker.lng !== null){
          $scope.map.markers["Incident" + incident_num] = marker;
        }
        incident_num++;
      });

      $scope.goTo();

    });



    /**
     * Center map on specific saved location
     * @param locationKey
     */
    $scope.goTo = function() {

      // var location = LocationsService.savedLocations[locationKey];
      var location = LocationsService;

      $scope.map.center  = {
        lat : location.lat,
        lng : location.lng,
        zoom : 11
      };

      // $scope.map.markers[locationKey] = {
      //   lat:location.lat,
      //   lng:location.lng,
      //   message: location.name,

      //   focus: true,
      //   draggable: false
      // };

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

  });