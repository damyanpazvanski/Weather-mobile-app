'use strict';

angular.module('myApp.view2', ['ngRoute', 'myApp.Requester'])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/forecast', {
        templateUrl: 'view2/view2.html',
        controller: 'View2Ctrl'
      });
    }])

    .controller('View2Ctrl', [
      '$scope',
      'location',
      function ($scope, location) {

        $scope.speedMeasure = 'kph';
        $scope.speedMeasureMain = 'Km/h';

        $scope.selectLanguage = 'en';

        $scope.tempMeasure = 'c';
        $scope.tempMeasureText = '°C';
        $scope.tempWord = 'celsius';


        var coordinates = location.getCoordinates();
        $scope.forecastInformation = [];
        $(document.body).css('overflow', 'visible');

        if (!coordinates.length) {
          $(document.body).html('');
          window.location.replace('/');
        }

        $('.loader-container').fadeIn();

        location.getForecast(coordinates[0], coordinates[1])
            .then(function (response) {
              var data = response.data;

              for (var i = 0; i <= 7; i++) {
                $scope.forecastInformation.push({
                  day: data.forecast[i].date.weekday_short,
                  highTemp: data.forecast[i].high[$scope.tempWord],
                  lowTemp: data.forecast[i].low[$scope.tempWord],
                  maxHumidity: data.forecast[i].maxhumidity,
                  minHumidity: data.forecast[i].minhumidity,
                  sunset: data.forecast[i].sunset_12,
                  sunrise: data.forecast[i].sunrise_12,
                  wind: data.forecast[i].maxwind.kph,
                  icon: data.forecast[i].icon
                });
              }

              $('.loader-container').hide();
            }, function (error) {
              $('.loader-container').hide();
              console.log(error);
            });

        $scope.changeTemp = function () {
          if ($scope.changeTemperatureMeasure !== true) {
            $scope.tempMeasure = 'c';
            $scope.tempMeasureText = '°C';
            $scope.tempWord = 'celsius';

            location.getForecast(coordinates[0], coordinates[1])
                .then(function (response) {
                  var data = response.data;
                  $scope.forecastInformation = [];

                  for (var i = 0; i <= 7; i++) {
                    $scope.forecastInformation.push({
                      day: data.forecast[i].date.weekday_short,
                      highTemp: data.forecast[i].high[$scope.tempWord],
                      lowTemp: data.forecast[i].low[$scope.tempWord],
                      maxHumidity: data.forecast[i].maxhumidity,
                      minHumidity: data.forecast[i].minhumidity,
                      sunset: data.forecast[i].sunset_12,
                      sunrise: data.forecast[i].sunrise_12,
                      wind: data.forecast[i].maxwind.kph,
                      icon: data.forecast[i].icon
                    });
                  }

                }, function (error) {
                  console.log(error);
                });

          } else {
            $scope.tempMeasure = 'f';
            $scope.tempMeasureText = 'F';
            $scope.tempWord = 'fahrenheit';

            location.getForecast(coordinates[0], coordinates[1])
                .then(function (response) {
                  var data = response.data;
                  $scope.forecastInformation = [];

                  for (var i = 0; i <= 7; i++) {
                    $scope.forecastInformation.push({
                      day: data.forecast[i].date.weekday_short,
                      highTemp: data.forecast[i].high[$scope.tempWord],
                      lowTemp: data.forecast[i].low[$scope.tempWord],
                      maxHumidity: data.forecast[i].maxhumidity,
                      minHumidity: data.forecast[i].minhumidity,
                      sunset: data.forecast[i].sunset_12,
                      sunrise: data.forecast[i].sunrise_12,
                      wind: data.forecast[i].maxwind.kph,
                      icon: data.forecast[i].icon
                    });
                  }

                }, function (error) {
                  console.log(error);
                });
          }
        };




        $scope.changeSpeed = function () {
          if ($scope.changeSpeedMeasure !== true) {
            $scope.speedMeasure = 'kph';
            $scope.speedMeasureMain = 'Km/h';

            location.getForecast(coordinates[0], coordinates[1])
                .then(function (response) {
                  var data = response.data;
                  $scope.forecastInformation = [];

                  for (var i = 0; i <= 7; i++) {
                    $scope.forecastInformation.push({
                      day: data.forecast[i].date.weekday_short,
                      highTemp: data.forecast[i].high[$scope.tempWord],
                      lowTemp: data.forecast[i].low[$scope.tempWord],
                      maxHumidity: data.forecast[i].maxhumidity,
                      minHumidity: data.forecast[i].minhumidity,
                      sunset: data.forecast[i].sunset_12,
                      sunrise: data.forecast[i].sunrise_12,
                      wind: data.forecast[i].maxwind[$scope.speedMeasure],
                      icon: data.forecast[i].icon
                    });
                  }

                }, function (error) {
                  console.log(error);
                });
          } else {
            $scope.speedMeasure = 'mph';
            $scope.speedMeasureMain = 'Mp/h';

            location.getForecast(coordinates[0], coordinates[1])
                .then(function (response) {
                  var data = response.data;
                  $scope.forecastInformation = [];

                  for (var i = 0; i <= 7; i++) {
                    $scope.forecastInformation.push({
                      day: data.forecast[i].date.weekday_short,
                      highTemp: data.forecast[i].high[$scope.tempWord],
                      lowTemp: data.forecast[i].low[$scope.tempWord],
                      maxHumidity: data.forecast[i].maxhumidity,
                      minHumidity: data.forecast[i].minhumidity,
                      sunset: data.forecast[i].sunset_12,
                      sunrise: data.forecast[i].sunrise_12,
                      wind: data.forecast[i].maxwind[$scope.speedMeasure],
                      icon: data.forecast[i].icon
                    });
                  }

                }, function (error) {
                  console.log(error);
                });
          }
        };

        $('#menu-icon').on('click', function () {
          $('#menu-background').fadeIn('slow');
          $('#home-page-content').animate({
            marginLeft: '+=85%'
          });
        });

        $('#menu-background').on('click', function () {
          $('#menu-background').hide();
          $('#home-page-content').animate({
            marginLeft: '-=85%'
          });
        });

        $scope.closeMenu = function () {
          $('#menu-background').hide();
          $('#home-page-content').animate({
            marginLeft: '-=85%'
          });
        }

      }]);