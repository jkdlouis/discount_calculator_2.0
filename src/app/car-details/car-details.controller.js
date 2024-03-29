(function() {
  'use strict';

  angular
    .module('newCalculator')
    .controller('CarDetailsController', CarDetailsController);

  /** @ngInject */
  function CarDetailsController($http, $location, $scope, $cookies, carDetailsService) {

    // car year options
    var carYears = [];
    $scope.carYears = carYears;
    for (var i = 2017; i >= 1970; i--) {
      carYears.push(i);
    }

		$scope.initialize = function() {
			var data = carDetailsService.getData();
			if(data) {
				$scope.selectedCarYear = data.year;
				$scope.selectedCarMake = data.make;
				$scope.selectedCarModel = data.model;
				$scope.getCarMake();
				$scope.getCarModel();
			}
		};

    // car make api call
    $scope.getCarMake = function() {
      var chosenYear = $scope.selectedCarYear;
      var edmundsUrl = 'https://forms.smartfinancial.com/api/v1/vehicle/makes?year=' + chosenYear + '&token=yhQwEoXKZU4y8RntnibxFmoy29UJqArr';

      if (chosenYear >= 1990) {
        $http.get(edmundsUrl)
          .success(function(result) {
            $scope.carMakes = result.makes;
          })
          .error(function(data) {
            console.log(data);
          });
      }
    };

    // car model api call
    $scope.getCarModel = function() {
      var url = 'https://forms.smartfinancial.com/api/v1/vehicle/models?year=' + $scope.selectedCarYear + '&make=' + $scope.selectedCarMake + '&token=yhQwEoXKZU4y8RntnibxFmoy29UJqArr';
      $http.get(url)
        .success(function(result) {
          $scope.carModels = result.models;
        })
        .error(function(data) {
          console.log(data);
        });

    };

    // form submit
    $scope.goTo = function() {
      var carYear = $scope.selectedCarYear;
      var carMake = $scope.selectedCarMake;
      var carModel = $scope.selectedCarModel;
      if(carYear !== '' && carMake !== '' && carModel !== '') {
        $location.path('/state');
        carDetailsService.setData(carYear, carMake, carModel);
        $cookies.put('carYear', carYear);
        $cookies.put('carMake', carMake);
        $cookies.put('carModel', carModel);
      } else if (carYear !== undefined && carMake !== undefined && carModel !== undefined) {
        $location.path('/state');
        carDetailsService.setData(carYear, carMake, carModel);
        $cookies.put('carYear', carYear);
        $cookies.put('carMake', carMake);
        $cookies.put('carModel', carModel);
        carDetailsService.setData(carYear, carMake, carModel);
      } else {
        $location.path('/driver-details');
      }
    };

}




})();
