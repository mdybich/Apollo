(function () {
  angular.module("app.services").factory("authService", authService);

  authService.$inject = ["$http", "$q", "localStorageService", "apiConfig"];

  function authService($http, $q, localStorageService, apiConfig) {
    var authContext = {
      isAuth: false,
      userName: "",
      userFirstName: "",
      userLastName: "",
      userId: ""
    };

    var authService = {
      login: login,
      register: register,
      logOut: logOut,
      fillAuthData: fillAuthData,
      getAuthContext: getAuthContext,
      getBasicUserInfo: getBasicUserInfo
    };

    return authService;

    //Public functions implementation

    function login(userName, password) {
      var data = "grant_type=password&username=" + userName + "&password=" + password;
      var url = apiConfig.baseApiUrl + "token";

      var deferred = $q.defer();

      $http.post(url, data, { headers: {"Content-Type": "application/x-www-form-urlencoded"}})
        .then(function(response) {
          var token = response.data.access_token;
          getBasicUserInfo(userName)
            .then(function(response) {
              localStorageService.set("authorizationData",
                {
                  token: token,
                  userName: userName ,
                  userFirstName: response.data.firstName,
                  userLastName: response.data.lastName,
                  userId: response.data.id
                });
              authContext.isAuth = true;
              authContext.userName = userName;
              authContext.userFirstName = response.data.firstName;
              authContext.userLastName = response.data.lastName;
              authContext.userId = response.data.id;
              deferred.resolve(response);
            }, function (error) {
              deferred.reject(error);
            })
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
      authContext.userFirstName = "";
      authContext.userLastName = "";
      authContext.userId = "";
    }

    function fillAuthData() {
      var authData = localStorageService.get("authorizationData");
      if (authData) {
        authContext.isAuth = true;
        authContext.userName = authData.userName;
        authContext.userFirstName = authData.userFirstName;
        authContext.userLastName = authData.userLastName;
        authContext.userId = authData.userId;
      }
    }

    function getAuthContext() {
      return authContext;
    }

    function getBasicUserInfo(userName) {
      var url = apiConfig.baseApiUrl + "api/account/userinfo/" + userName;

      return $http.get(url);
    }
  }

})();