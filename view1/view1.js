'use strict';

angular.module('myApp.view1', ['ngRoute', 'myApp.Requester'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', [
        '$scope',
        '$interval',
        'location',
        function ($scope, $interval, location) {

            $scope.speedMeasure = 'kph';
            $scope.speedMeasureMain = 'Km/h';

            $scope.selectLanguage = 'en';

            $scope.tempMeasure = 'c';
            $scope.tempMeasureText = '°C';
            $scope.tempWord = 'celsius';

            var coordinates = location.getCoordinates();

            function loadMainPage() {
                $('.loader-container').fadeIn();

                location.userPosition()
                    .then(function (response) {
                        var lat = response.data.lat,
                            lon = response.data.lon;

                        location.currentCity(lat, lon, $scope.selectLanguage)
                            .then(function (response) {
                                var data = response.data,
                                    currentData = data.current;
                                $scope.forecastInformation = [];
                                $scope.currentWeather = {
                                    city: currentData.display_location.city,
                                    country: currentData.display_location.country_iso3166,
                                    humidity: currentData.relative_humidity,
                                    temperature: currentData['temp_' + $scope.tempMeasure],
                                    windSpeed: currentData['wind_' + $scope.speedMeasure],
                                    description: currentData.weather,
                                    icon: currentData.icon,
                                    pressure: currentData.pressure_mb
                                };

                                for (var i = 1; i < 7; i++) {
                                    $scope.forecastInformation.push({
                                        day: data.forecast[i].date.weekday_short,
                                        highTemp: data.forecast[i].high[$scope.tempWord],
                                        lowTemp: data.forecast[i].low[$scope.tempWord],
                                        icon: data.forecast[i].icon
                                    });
                                }

                                $('#searchByCity').val('');
                                $('.loader-container').hide();

                            }, function (error) {
                                $('#searchByCity').val('');
                                $('.loader-container').hide();
                                $('#wrong-message').show().delay(1500).hide();
                            })
                    }, function (error) {
                        $('#searchByCity').val('');
                        $('.loader-container').hide();
                        $('#wrong-message').show().delay(1500).hide();
                    });
            }

            if (coordinates.length) {
                $('.loader-container').fadeIn();
                location.currentCity(coordinates[0], coordinates[1], $scope.selectLanguage)
                    .then(function (response) {
                        var data = response.data,
                            currentData = data.current;
                        $scope.forecastInformation = [];

                        $scope.currentWeather = {
                            city: currentData.display_location.city,
                            country: currentData.display_location.country_iso3166,
                            humidity: currentData.relative_humidity,
                            temperature: currentData['temp_' + $scope.tempMeasure],
                            windSpeed: currentData['wind_' + $scope.speedMeasure],
                            description: currentData.weather,
                            icon: currentData.icon,
                            pressure: currentData.pressure_mb
                        };

                        for (var i = 1; i < 7; i++) {
                            $scope.forecastInformation.push({
                                day: data.forecast[i].date.weekday_short,
                                highTemp: data.forecast[i].high[$scope.tempWord],
                                lowTemp: data.forecast[i].low[$scope.tempWord],
                                icon: data.forecast[i].icon
                            });
                        }

                        $('.loader-container').hide();
                    }, function (error) {
                        $('.loader-container').hide();
                        $('#wrong-message').show().delay(1500).hide();
                    })
            } else {
                loadMainPage();
            }

            $scope.changeTemp = function () {
                if ($scope.changeTemperatureMeasure !== true) {
                    $scope.tempMeasure = 'c';
                    $scope.tempMeasureText = '°C';
                    $scope.tempWord = 'celsius';
                    if ($scope.coordinates) {
                        location.currentCity($scope.coordinates[0], $scope.coordinates[1], $scope.selectLanguage)
                            .then(function (response) {
                                var data = response.data,
                                    currentData = data.current;
                                $scope.forecastInformation = [];

                                $scope.currentWeather = {
                                    city: currentData.display_location.city,
                                    country: currentData.display_location.country_iso3166,
                                    humidity: currentData.relative_humidity,
                                    temperature: currentData['temp_' + $scope.tempMeasure],
                                    windSpeed: currentData['wind_' + $scope.speedMeasure],
                                    description: currentData.weather,
                                    icon: currentData.icon,
                                    pressure: currentData.pressure_mb
                                };

                                for (var i = 1; i < 7; i++) {
                                    $scope.forecastInformation.push({
                                        day: data.forecast[i].date.weekday_short,
                                        highTemp: data.forecast[i].high[$scope.tempWord],
                                        lowTemp: data.forecast[i].low[$scope.tempWord],
                                        icon: data.forecast[i].icon
                                    });
                                }

                            }, function (error) {
                                $('#wrong-message').show().delay(1500).hide();
                            })
                    } else {
                        loadMainPage();
                    }

                } else {
                    $scope.tempMeasure = 'f';
                    $scope.tempMeasureText = 'F';
                    $scope.tempWord = 'fahrenheit';
                    if ($scope.coordinates) {
                        location.currentCity($scope.coordinates[0], $scope.coordinates[1], $scope.selectLanguage)
                            .then(function (response) {
                                var data = response.data,
                                    currentData = data.current;
                                $scope.forecastInformation = [];

                                $scope.currentWeather = {
                                    city: currentData.display_location.city,
                                    country: currentData.display_location.country_iso3166,
                                    humidity: currentData.relative_humidity,
                                    temperature: currentData['temp_' + $scope.tempMeasure],
                                    windSpeed: currentData['wind_' + $scope.speedMeasure],
                                    description: currentData.weather,
                                    icon: currentData.icon,
                                    pressure: currentData.pressure_mb
                                };

                                for (var i = 1; i < 7; i++) {
                                    $scope.forecastInformation.push({
                                        day: data.forecast[i].date.weekday_short,
                                        highTemp: data.forecast[i].high[$scope.tempWord],
                                        lowTemp: data.forecast[i].low[$scope.tempWord],
                                        icon: data.forecast[i].icon
                                    });
                                }

                            }, function (error) {
                                $('#wrong-message').show().delay(1500).hide();
                            })
                    } else {
                        loadMainPage();
                    }
                }
            };

            $scope.changeSpeed = function () {
                if ($scope.changeSpeedMeasure !== true) {
                    $scope.speedMeasure = 'kph';
                    $scope.speedMeasureMain = 'Km/h';
                    if ($scope.speedMeasure) {
                        location.currentCity($scope.coordinates[0], $scope.coordinates[1], $scope.selectLanguage)
                            .then(function (response) {
                                var data = response.data,
                                    currentData = data.current;
                                $scope.forecastInformation = [];

                                $scope.currentWeather = {
                                    city: currentData.display_location.city,
                                    country: currentData.display_location.country_iso3166,
                                    humidity: currentData.relative_humidity,
                                    temperature: currentData['temp_' + $scope.tempMeasure],
                                    windSpeed: currentData['wind_' + $scope.speedMeasure],
                                    description: currentData.weather,
                                    icon: currentData.icon,
                                    pressure: currentData.pressure_mb
                                };

                                for (var i = 1; i < 7; i++) {
                                    $scope.forecastInformation.push({
                                        day: data.forecast[i].date.weekday_short,
                                        highTemp: data.forecast[i].high[$scope.tempWord],
                                        lowTemp: data.forecast[i].low[$scope.tempWord],
                                        icon: data.forecast[i].icon
                                    });
                                }

                            }, function (error) {
                                $('#wrong-message').show().delay(1500).hide();
                            })
                    } else {
                        loadMainPage();
                    }
                } else {
                    $scope.speedMeasure = 'mph';
                    $scope.speedMeasureMain = 'Mp/h';
                    if ($scope.speedMeasure) {
                        location.currentCity($scope.coordinates[0], $scope.coordinates[1], $scope.selectLanguage)
                            .then(function (response) {
                                var data = response.data,
                                    currentData = data.current;
                                $scope.forecastInformation = [];

                                $scope.currentWeather = {
                                    city: currentData.display_location.city,
                                    country: currentData.display_location.country_iso3166,
                                    humidity: currentData.relative_humidity,
                                    temperature: currentData['temp_' + $scope.tempMeasure],
                                    windSpeed: currentData['wind_' + $scope.speedMeasure],
                                    description: currentData.weather,
                                    icon: currentData.icon,
                                    pressure: currentData.pressure_mb
                                };

                                for (var i = 1; i < 7; i++) {
                                    $scope.forecastInformation.push({
                                        day: data.forecast[i].date.weekday_short,
                                        highTemp: data.forecast[i].high[$scope.tempWord],
                                        lowTemp: data.forecast[i].low[$scope.tempWord],
                                        icon: data.forecast[i].icon
                                    });
                                }


                            }, function (error) {
                                $('#wrong-message').show().delay(1500).hide();
                            })
                    } else {
                        loadMainPage();
                    }
                }
            };

            $scope.changeLanguage = function () {
                if ($scope.coordinates) {
                    location.currentCity($scope.coordinates[0], $scope.coordinates[1], $scope.selectLanguage)
                        .then(function (response) {
                            var data = response.data,
                                currentData = data.current;
                            $scope.forecastInformation = [];

                            $scope.currentWeather = {
                                city: currentData.display_location.city,
                                country: currentData.display_location.country_iso3166,
                                humidity: currentData.relative_humidity,
                                temperature: currentData['temp_' + $scope.tempMeasure],
                                windSpeed: currentData['wind_' + $scope.speedMeasure],
                                description: currentData.weather,
                                icon: currentData.icon,
                                pressure: currentData.pressure_mb
                            };

                            for (var i = 1; i < 7; i++) {
                                $scope.forecastInformation.push({
                                    day: data.forecast[i].date.weekday_short,
                                    highTemp: data.forecast[i].high[$scope.tempWord],
                                    lowTemp: data.forecast[i].low[$scope.tempWord],
                                    icon: data.forecast[i].icon
                                });
                            }

                        }, function (error) {
                            $('#wrong-message').show().delay(1500).hide();
                        })
                } else {
                    loadMainPage();
                }
            };

            $scope.chooseCity = function () {
                location.search($scope.searchForCity, $scope.selectLanguage)
                    .then(function (response) {
                        var lat = response.data[0],
                            lon = response.data[1],
                            arrNames = response.suggestions;

                        if (response.data) {
                            $("#searchByCity").autocomplete({
                                source: arrNames,
                                select: function (event, ui) {
                                    var choosenIndex;

                                    arrNames.filter(function (name, index) {
                                        if (name == ui.item.value) {
                                            choosenIndex = index;
                                        }
                                    });

                                    if (!response.data[choosenIndex]) {
                                        $("#searchByCity").val('');
                                        $('#wrong-message').show().delay(1500).hide();
                                        return;
                                    }

                                    $scope.coordinates = response.data[choosenIndex].split(',');
                                    location.setCoordinates($scope.coordinates);
                                    $('.loader-container').fadeIn();

                                    location.currentCity($scope.coordinates[0], $scope.coordinates[1], $scope.selectLanguage)
                                        .then(function (response) {
                                            var data = response.data,
                                                currentData = data.current;
                                            $scope.forecastInformation = [];

                                            $scope.currentWeather = {
                                                city: currentData.display_location.city,
                                                country: currentData.display_location.country_iso3166,
                                                humidity: currentData.relative_humidity,
                                                temperature: currentData['temp_' + $scope.tempMeasure],
                                                windSpeed: currentData['wind_' + $scope.speedMeasure],
                                                description: currentData.weather,
                                                icon: currentData.icon,
                                                pressure: currentData.pressure_mb
                                            };

                                            for (var i = 1; i < 7; i++) {
                                                $scope.forecastInformation.push({
                                                    day: data.forecast[i].date.weekday_short,
                                                    highTemp: data.forecast[i].high[$scope.tempWord],
                                                    lowTemp: data.forecast[i].low[$scope.tempWord],
                                                    icon: data.forecast[i].icon
                                                });
                                            }

                                            $('#searchByCity').val('');
                                            $('.loader-container').hide();

                                        }, function (error) {
                                            $('.loader-container').hide();
                                            $('#searchByCity').val('');
                                            $('#wrong-message').show().delay(1500).hide();
                                        })
                                }
                            });
                        }

                    }, function (error) {
                        $("#searchByCity").val('');
                        $('.loader-container').hide();
                        $('#wrong-message').show().delay(1500).hide();
                    });
            };

            $scope.refresh = function () {
                $scope.coordinates = $scope.coordinates || [];

                if ($scope.coordinates.length) {
                    $('.loader-container').fadeIn();
                    location.currentCity($scope.coordinates[0], $scope.coordinates[1], $scope.selectLanguage)
                        .then(function (response) {
                            var data = response.data,
                                currentData = data.current;
                            $scope.forecastInformation = [];

                            $scope.currentWeather = {
                                city: currentData.display_location.city,
                                country: currentData.display_location.country_iso3166,
                                humidity: currentData.relative_humidity,
                                temperature: currentData['temp_' + $scope.tempMeasure],
                                windSpeed: currentData['wind_' + $scope.speedMeasure],
                                description: currentData.weather,
                                icon: currentData.icon,
                                pressure: currentData.pressure_mb
                            };

                            for (var i = 1; i < 7; i++) {
                                $scope.forecastInformation.push({
                                    day: data.forecast[i].date.weekday_short,
                                    highTemp: data.forecast[i].high[$scope.tempWord],
                                    lowTemp: data.forecast[i].low[$scope.tempWord],
                                    icon: data.forecast[i].icon
                                });
                            }

                            $('.loader-container').hide();

                        }, function (error) {
                            $('.loader-container').hide();
                            $('#wrong-message').show().delay(1500).hide();
                        })

                } else {
                    loadMainPage();
                }

            };

            $interval(function () {
                $scope.refresh();
            }, 1000 * 60);

            $('#menu-icon').on('click', function () {
                $('#menu-background').fadeIn('slow');
                $('.menu-changes').css('overflow', 'hidden');
                $('#home-page-content').animate({
                    marginLeft: '+=85%'
                });
            });

            $('#menu-background').on('click', function () {
                $('#menu-background').hide();
                $('.menu-changes').css('overflow', 'visible');
                $('#home-page-content').animate({
                    marginLeft: '-=85%'
                });
            });

            $scope.closeMenu = function () {
                $('#menu-background').hide();
                $('#home-page-content').animate({
                    marginLeft: '-=85%'
                });
            };

            window.addEventListener('orientationchange', function () {
                $('#home-page-content').css('overflow', 'visible');
            });

            $('#forecast').on('click', function () {
                window.scroll(0, 0);
                window.scrollTo(0, 0);
                console.log(' asdda');
            });

        }]);