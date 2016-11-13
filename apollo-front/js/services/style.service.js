(function () {
  angular.module("app.services").factory("styleService", styleService);

  styleService.$inject = ["apiConfig", "$http"];

  function styleService(apiConfig, $http) {
    var styleService = {
      getStyles: getStyles
    };

    return styleService;

    function getStyles() {
      var url = apiConfig.baseApiUrl + "api/styles/get";

      return $http.get(url);
    }
  }
})();