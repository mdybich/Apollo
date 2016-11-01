(function () {
  angular.module("app.services").factory("authService", authService);

  authService.$inject = ["$http", "$q", "localStorageService", "apiConfig"];

  function authService($http, $q, localStorageService, apiConfig) {
    var authContext = {
      isAuth: false,
      userName: ""
    };

    var authService = {
      login: login,
      register: register,
      logOut: logOut,
      fillAuthData: fillAuthData,
      getAuthContext: getAuthContext
    };

    return authService;

    //Public functions implementation

    function login(userName, password) {
      var data = "grant_type=password&username=" + userName + "&password=" + password;
      var url = apiConfig.baseApiUrl + "token";

      var deferred = $q.defer();

      $http.post(url, data, { headers: {"Content-Type": "application/x-www-form-urlencoded"}})
        .then(function(response) {
          localStorageService.set('authorizationData', { token: response.access_token, userName: userName });
          authContext.isAuth = ture;
          authContext.userName = userName;
          deferred.resolve(response);
        }, function (error) {
          logOut();
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function register(newUser) {
      logOut();
      var deferred = $q.defer();
      var url = apiConfig.baseApiUrl + "api/account/register";

      $http.post(url, newUser)
        .then(function(response) {
          deferred.resolve(response);
        }, function (error) {
          deferred.reject(error)
        });

      return deferred.promise;
    }

    function logOut() {
      localStorageService.remove("authorizationData");
      authContext.isAuth = false;
      authContext.userName = "";
    }

    function fillAuthData() {
      var authData = localStorageService.get("authorizationData");
      if (authData) {
        authContext.isAuth = true;
        authContext.userName = authData.userName;
      }
    }

    function getAuthContext() {
      return authContext;
    }
  }

})();