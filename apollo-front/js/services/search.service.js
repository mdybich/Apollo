(function () {
  angular.module("app.services").factory("searchService", searchService);

  searchService.$inject = ["apiConfig", "$http", "$httpParamSerializer"];

  function searchService(apiConfig, $http, $httpParamSerializer) {
    var searchService = {
      getTopAlbums: getTopAlbums,
      search: search,
      advancedSearch: advancedSearch
    };

    return searchService;

    function getTopAlbums() {
      var url = apiConfig.baseApiUrl + "api/search/top";

      return $http.get(url);
    }

    function search(phrase) {
      var url = apiConfig.baseApiUrl + "api/search/album?";
      var queryString = $httpParamSerializer({searchPhrase: phrase});

      return $http.get(url + queryString);
    }
    
    function advancedSearch(searchModel) {
      var url = apiConfig.baseApiUrl + "api/search/advance/album?";
      var queryString = $httpParamSerializer(searchModel);

      return $http.get(url + queryString);
    }
  }
})();