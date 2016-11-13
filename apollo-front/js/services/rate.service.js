(function () {
  angular.module("app.services").factory("rateService", rateService);

  rateService.$inject = ["$http", "apiConfig", "$httpParamSerializer"];

  function rateService($http, apiConfig, $httpParamSerializer) {
    var rateService = {
      rateAlbum: rateAlbum,
      getCurrentRating: getCurrentRating
    };

    return rateService;

    function rateAlbum(userId, albumId, rating) {
      var url = apiConfig.baseApiUrl + "api/rate/album";

      var rate = {
        userId: userId,
        albumId: albumId,
        rating: rating
      };

      return $http.post(url, rate);
    }

    function getCurrentRating(userId, albumId) {
      var url = apiConfig.baseApiUrl + "api/rate/current?";
      var query = $httpParamSerializer({userId: userId, albumId: albumId});

      return $http.get(url + query);
    }
  }
})();