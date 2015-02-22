angular.module('mobility').factory('LocationsService', [ function() {

  var locationsObj = {};

  locationsObj.startingLocation = {
    name : "Oahu, Hawaii, USA",
    lat : 21.438912,
    lng : -158.000057
  };

  return locationsObj.startingLocation;

}]);