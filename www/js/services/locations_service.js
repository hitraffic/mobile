(function() {
  'use strict';

  angular.module('mobility')
    .factory('LocationsService', LocationsService);

  function LocationsService() {
    var locationsObj = {};

    locationsObj.startingLocation = {
      starting: true,
      name : "Oahu, Hawaii, USA",
      lat : 21.438912,
      lng : -158.000057
    };

    return locationsObj.startingLocation;
  }
})();
