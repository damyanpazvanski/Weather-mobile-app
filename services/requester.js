angular.module('myApp.Requester', [])
    .factory('location',
        function ($http, $q) {

            var property = [];

            function getLatAndLon() {

                var defer = $q.defer();

                $http.get('http://ip-api.com/json')
                    .then(
                        function (response) {
                            defer.resolve(response);
                        },
                        function (error) {
                            defer.reject(error);
                        }
                    );

                return defer.promise;
            }

            function getWeatherByLatLon(lat, lon, selectedLanguage) {
                var defer = $q.defer();

                $http.jsonp('http://api.you-weather.com/get/data/' + selectedLanguage + '?c=' + lat + ',' + lon + '&callback=callback=JSON_CALLBACK')
                    .then(
                        function (response) {
                            defer.resolve(response);
                        },
                        function (error) {
                            defer.reject(error);
                        }
                    );

                return defer.promise;
            }

            function searchForCity(city, selectedLanguage) {
                var defer = $q.defer();

                $http.jsonp('http://api.you-weather.com/get/suggest/' + selectedLanguage + '?q=' + city + '&callback=callback=JSON_CALLBACK')
                    .then(
                        function (response) {
                            defer.resolve(response.data);
                        },
                        function (error) {
                            defer.reject(error);
                        }
                    );

                return defer.promise;
            }

            function getForecast(lat, lon) {
                var defer = $q.defer();

                $http.jsonp('http://api.you-weather.com/get/data/en?c=' + lat + ',' + lon + '&callback=callback=JSON_CALLBACK')
                    .then(
                        function (response) {
                            defer.resolve(response);
                        },
                        function (error) {
                            defer.reject(error);
                        }
                    );

                return defer.promise;
            }

            return {
                userPosition: getLatAndLon,
                currentCity: getWeatherByLatLon,
                search: searchForCity,
                getForecast: getForecast,
                getCoordinates: function () {
                    return property;
                },
                setCoordinates: function(value) {
                    property = value;
                }
            }
        }

    );
