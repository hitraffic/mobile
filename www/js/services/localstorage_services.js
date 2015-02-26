angular.module('mobility')

// Source: http://learn.ionicframework.com/formulas/localstorage/
.factory('$localStorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      var item = $window.localStorage[key];
      return item ? JSON.parse(item) : undefined;
    }
  };
}]);
