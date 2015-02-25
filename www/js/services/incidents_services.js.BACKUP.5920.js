angular.module('mobility')

.factory('Incidents', function($http) {
  // Traffic API mock data
<<<<<<< HEAD
  var incidents = [
    {
      "id": 0,
      "date": "2/9/2015, 2:43 PM",
      "code": "550",
      "type": "MOTOR VEHICLE COLLISION",
      "address": "ALA MOANA & CORAL ST",
      "location": null,
      "area": "KAKAAKO",
      "lat": 21.297355,
      "lng": -157.861581
    },
    {
      "id": 1,
      "date": "2/9/2015, 2:41 PM",
      "code": "632",
      "type": "HAZARDOUS DRIVER",
      "address": "N KAINALU DR & UILAMA ST",
      "location": null,
      "area": "KAILUA",
      "lat": 21.412146,
      "lng": -157.746353
    },
    {
      "id": 2,
      "date": "2/9/2015, 3:01 PM",
      "code": "633",
      "type": "STALLED/HAZARDOUS VEHICLE",
      "address": "KALANI/KEAHOLE",
      "location": null,
      "area": null,
      "lat": null,
      "lng": null
    },
    {
      "id": 3,
      "date": "2/9/2015, 3:00 PM",
      "code": "630",
      "type": "TRAFFIC NUISANCE OR PARKING VIOLATION",
      "address": "KAMEHAMEHA HWY & KULEANA RD",
      "location": null,
      "area": "PEARL CITY",
      "lat": 21.389531,
      "lng": -157.959728
    },
    {
      "id": 4,
      "date": "2/9/2015, 2:57 PM",
      "code": "550",
      "type": "MOTOR VEHICLE COLLISION",
      "address": "99058X KAM HWY",
      "location": "MAKALAPA GATE PH",
      "area": "PEARL HBR",
      "lat": 21.413385,
      "lng": -157.800201
    },
    {
      "id": 5,
      "date": "2/9/2015, 3:21 PM",
      "code": "550",
      "type": "MOTOR VEHICLE COLLISION",
      "address": "AUMOKU ST & KANEOHE BAY DR",
      "location": null,
      "area": "KANEOHE",
      "lat": 21.403316,
      "lng": -157.797841
    },
    {
      "id": 6,
      "date": "2/9/2015, 3:11 PM",
      "code": "633",
      "type": "STALLED/HAZARDOUS VEHICLE",
      "address": "14X H1W FWY",
      "location": "H1W RADFORD PED OP",
      "area": "AIEA",
      "lat": null,
      "lng": null
    },
    {
      "id": 7,
      "date": "2/9/2015, 3:38 PM",
      "code": "550",
      "type": "MOTOR VEHICLE COLLISION",
      "address": "KAHEKILI HWY & KAHUHIPA ST",
      "location": null,
      "area": "KANEOHE",
      "lat": 21.41319,
      "lng": -157.810308
    },
    {
      "id": 8,
      "date": "2/9/2015, 3:38 PM",
      "code": "550",
      "type": "MOTOR VEHICLE COLLISION",
      "address": "45072X KEAAHALA RD",
      "location": "WINDWARD COMM COLLEG",
      "area": "KANEOHE",
      "lat": 21.411072,
      "lng": -157.807561
    },
    {
      "id": 9,
      "date": "2/9/2015, 3:37 PM",
      "code": "550",
      "type": "MOTOR VEHICLE COLLISION",
      "address": "87111X PAAKEA RD",
      "location": "MIKILUA GROCERY",
      "area": "MAILI",
      "lat": 21.424496,
      "lng": -158.166762
    },
    {
      "id": 10,
      "date": "2/9/2015, 3:35 PM",
      "code": "632",
      "type": "HAZARDOUS DRIVER",
      "address": "NUUANU AVE & PALI HWY",
      "location": null,
      "area": "NUUANU",
      "lat": null,
      "lng": null
    },
    {
      "id": 11,
      "date": "2/9/2015, 3:26 PM",
      "code": "550",
      "type": "MOTOR VEHICLE COLLISION",
      "address": "KALAKAUA AVE & KANUNU ST",
      "location": null,
      "area": "HONOLULU",
      "lat": 21.294117,
      "lng": -157.836915
    },
    {
      "id": 12,
      "date": "2/9/2015, 3:46 PM",
      "code": "550",
      "type": "MOTOR VEHICLE COLLISION",
      "address": "72X 8TH AVE",
      "location": null,
      "area": "KAIMUKI",
      "lat": null,
      "lng": null
    },
    {
      "id": 13,
      "date": "2/9/2015, 3:45 PM",
      "code": "630",
      "type": "TRAFFIC NUISANCE OR PARKING VIOLATION",
      "address": "PALI HWY & WAOKANAKA ST",
      "location": null,
      "area": "NUUANU",
      "lat": 21.342531,
      "lng": -157.832538
    },
    {
      "id": 14,
      "date": "2/9/2015, 3:44 PM",
      "code": "550",
      "type": "MOTOR VEHICLE COLLISION",
      "address": "174X KEALIA DR",
      "location": null,
      "area": "KALIHI",
      "lat": 21.335616,
      "lng": -157.859059
    },
    {
      "id": 15,
      "date": "2/9/2015, 4:06 PM",
      "code": "633",
      "type": "STALLED/HAZARDOUS VEHICLE",
      "address": "20X H1E FWY",
      "location": "H1E LIKELIKE OFF",
      "area": "KALIHI",
      "lat": null,
      "lng": null
    },
    {
      "id": 16,
      "date": "2/9/2015, 4:22 PM",
      "code": "560",
      "type": "TRAFFIC INCIDENT - NO COLLISION",
      "address": "421X BOUGAINVILLE AVE",
      "location": null,
      "area": "KALAELOA",
      "lat": 21.326741,
      "lng": -158.056985
    },
    {
      "id": 17,
      "date": "2/9/2015, 4:10 PM",
      "code": "550",
      "type": "MOTOR VEHICLE COLLISION",
      "address": "330X AOLELE ST",
      "location": null,
      "area": "AIRPORT",
      "lat": 21.332778,
      "lng": -157.910043
    },
    {
      "id": 18,
      "date": "2/9/2015, 4:53 PM",
      "code": "632",
      "type": "HAZARDOUS DRIVER",
      "address": "13X H1W FWY",
      "location": "H1W KAIMAKANI OP",
      "area": "AIEA",
      "lat": null,
      "lng": null
    },
    {
      "id": 19,
      "date": "2/9/2015, 4:47 PM",
      "code": "550",
      "type": "MOTOR VEHICLE COLLISION",
      "address": "99X KALAPAKI ST",
      "location": null,
      "area": "HAWAII KAI",
      "lat": 21.302793,
      "lng": -157.683965
    }
];
=======
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
>>>>>>> 6e8ab6d7de553ef145bd9cc6909ed7758abd991a

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
