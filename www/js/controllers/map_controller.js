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
    // Once state loaded, put map on scope.
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
      //FIX: Create function to continually check for updates to HITraffic API
      $scope.incidents = Incidents.all();
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

      //Go to initial map
      $scope.focusHere(LocationsService);

    });



    /**
     * Center map on specific saved location
     * @param locationKey
     */
    $scope.focusHere = function(incident) {
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

  });