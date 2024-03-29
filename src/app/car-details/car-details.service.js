(function() {
  'use strict';

  angular
    .module('newCalculator')
    .factory('carDetailsService', carDetailsService);

  function carDetailsService() {
    var savedData;

    return {
      getData: function() {
        return savedData;
      },
      setData: function(value1, value2, value3) {
        savedData = {
          year: value1,
          make: value2,
          model: value3
        }
      }
    };
  }

})();
