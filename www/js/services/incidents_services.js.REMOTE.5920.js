angular.module('mobility')

.factory('Incidents', function($http) {
  // Traffic API mock data
  var incidents = null;
  $http.get('api/incidents.json')
    .success(function(data, status, headers, config) {
      incidents = data;
    })
    .error(function(data, status, headers, config) {
      console.log('Error in requesting the incidents resource:');
      console.log(data);
    });

  var ICON_TYPES = {
    DEFAULT: 'img/ionic.png',
    MOTOR_VEHICLE_COLLISION: 'img/ionic.png',
    HAZARDOUS_DRIVER: 'img/ionic.png',
    STALLED_HAZARDOUS_VEHICLE: 'img/ionic.png',
    TRAFFIC_NUISANCE_OR_PARKING_VIOLATION: 'img/ionic.png',
    TRAFFIC_INCIDENT_NO_COLLISION: 'img/ionic.png'
  };

  // Display user-friendly text if values are null
  function prepareDataForDisplay(data) {
    if (data !== null) {
      data.forEach(function(item) {
        item.area = setDisplayText(item.area, 'area');
        item.address = setDisplayText(item.address, 'address');
        item.date = setDisplayText(item.date, 'date');
        // Set the icon to display based on type of incident
        item.icon = setIconType(item.type);
      });
    }
    return data;
  }

  function setDisplayText(property, propertyName) {
    return property ? property: 'No ' + propertyName + ' provided';
  }

  function setIconType(type) {
    switch(type) {
      case 'MOTOR VEHICLE COLLISION':
        return ICON_TYPES.MOTOR_VEHICLE_COLLISION;
      case 'HAZARDOUS DRIVER':
        return ICON_TYPES.HAZARDOUS_DRIVER;
      case 'STALLED/HAZARDOUS VEHICLE':
        return ICON_TYPES.STALLED_HAZARDOUS_VEHICLE;
      case 'TRAFFIC NUISANCE OR PARKING VIOLATION':
        return ICON_TYPES.TRAFFIC_NUISANCE_OR_PARKING_VIOLATION;
      case 'TRAFFIC INCIDENT - NO COLLISION':
        return ICON_TYPES.TRAFFIC_INCIDENT_NO_COLLISION;
      default:
        return ICON_TYPES.DEFAULT;
    }
  }

  function filterIncidents(data) {
    // TODO: Use actual settings service; it's mock data for now
    var userAreas = ['AIEA', 'HAWAII KAI', 'PEARL CITY', 'KAKAAKO', 'KAILUA', 'KALIHI', 'AIRPORT'];
    var userTypes = ['MOTOR VEHICLE COLLISION', 'HAZARDOUS DRIVER', 'STALLED/HAZARDOUS VEHICLE'];

    var filteredIncidents = data;
    if (filteredIncidents !== null) {
      filteredIncidents = filteredIncidents.filter(function(item) {
        return userAreas.indexOf(item.area) !== -1 && userTypes.indexOf(item.type) !== -1
      });
    }

    return filteredIncidents;
  }

  return {
    all: function() {
      var filteredIncidents = filterIncidents(incidents);
      return prepareDataForDisplay(filteredIncidents);
    },
    remove: function(incident) {
      incidents.splice(incidents.indexOf(incident), 1);
    },
    get: function(incidentId) { // State params id is a string value
      for (var i = 0; i < incidents.length; i++) {
        if (incidents[i].id === parseInt(incidentId)) {
          return incidents[i];
        }
      }
      return null;
    }
  };
});
