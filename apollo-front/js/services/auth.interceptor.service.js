(function () {
  angular.module("app.services").factory("authInterceptorService", authInterceptorService);

  authInterceptorService.$inject = ["localStorageService"];
  
  function authInterceptorService(localStorageService) {
    var authInterceptorService = {
      request: request
    };

    return authInterceptorService;
    
    function request(config) {
      config.headers = config.headers || {};
      var authData = localStorageService.get("authorizationData");

      if(authData) {
        config.headers.Authorization = "Bearer" + authData.token;
      }

      return config;
    }
  }
})();