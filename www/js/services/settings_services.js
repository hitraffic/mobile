angular.module('mobility')

.factory('Settings', function($http, $localStorage) {
  // Default preferred types
  var preferredTypes = [
    {
      name: 'DEFAULT',
      enabled: true
    },
    {
      name: 'MOTOR VEHICLE COLLISION',
      enabled: true
    },
    {
      name: 'HAZARDOUS DRIVER',
      enabled: true
    },
    {
      name: 'STALLED/HAZARDOUS VEHICLE',
      enabled: true
    },
    {
      name: 'TRAFFIC NUISANCE OR PARKING VIOLATION',
      enabled: true
    },
    {
      name: 'TRAFFIC INCIDENT - NO COLLISION',
      enabled: true
    }
  ];

  // Default preferred areas
  var preferredAreas = [
    {
      name: 'AIEA',
      enabled: true
    },
    {
      name: 'HAWAII KAI',
      enabled: true
    },
    {
      name: 'PEARL CITY',
      enabled: true
    },
    {
      name: 'KAKAAKO',
      enabled: true
    },
    {
      name: 'KAILUA',
      enabled: true
    },
    {
      name: 'KALIHI',
      enabled: true
    },
    {
      name: 'AIRPORT',
      enabled: true
    },
    {
      name: 'PEARL HBR',
      enabled: true
    },
    {
      name: 'KANEOHE',
      enabled: true
    },
    {
      name: 'MAILI',
      enabled: true
    },
    {
      name: 'NUUANU',
      enabled: true
    },
    {
      name: 'HONOLULU',
      enabled: true
    },
    {
      name: 'KAIMUKI',
      enabled: true
    },
    {
      name: 'KALAELOA',
      enabled: true
    }
  ];

  function retrieveTypes() {
    var types = $localStorage.getObject('preferredTypes');
    return types ? types : preferredTypes;
  }

  function retrieveAreas() {
    var areas = $localStorage.getObject('preferredAreas');
    return areas ? areas : preferredAreas;
  }

  function filterEnabledTypes() {
    var types = retrieveTypes();
    if (!types) {
      return null;
    }

    return types.filter(function(item) {
      return item.enabled;
    }).map(function(item) {
      return item.name;
    });
  }

  function filterEnabledAreas() {
    var areas = retrieveAreas();
    if (!areas) {
      return null;
    }

    return areas.filter(function(item) {
      return item.enabled;
    }).map(function(item) {
      return item.name;
    });
  }

  return {
    setTypes: function(types) {
      $localStorage.setObject('preferredTypes', types);
    },
    getTypes: retrieveTypes,
    getEnabledTypes: filterEnabledTypes,
    setAreas: function(areas) {
      $localStorage.setObject('preferredAreas', areas);
    },
    getAreas: retrieveAreas,
    getEnabledAreas: filterEnabledAreas
  };
});
