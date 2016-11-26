(function () {
  angular.module("app.services").factory("authService", authService);

  authService.$inject = ["$http", "$q", "localStorageService", "apiConfig"];

  function authService($http, $q, localStorageService, apiConfig) {
    var authContext = {
      isAuth: false,
      userName: "",
      userFirstName: "",
      userLastName: "",
      userId: "",
      userRoles: []
    };

    var externalAuthData = {
      provider: "",
      userName: "",
      externalAccessToken: ""
    };

    var authService = {
      login: login,
      register: register,
      logOut: logOut,
      fillAuthData: fillAuthData,
      getAuthContext: getAuthContext,
      getBasicUserInfo: getBasicUserInfo,
      registerExternal: registerExternal,
      getExternalAuthData: getExternalAuthData,
      setExternalAuthData: setExternalAuthData,
      obtainAccessToken: obtainAccessToken
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
                  userId: response.data.id,
                  userRoles: response.data.roles
                });
              authContext.isAuth = true;
              authContext.userName = userName;
              authContext.userFirstName = response.data.firstName;
              authContext.userLastName = response.data.lastName;
              authContext.userId = response.data.id;
              authContext.userRoles = response.data.roles;
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
      authContext.userRoles = [];
    }

    function fillAuthData() {
      var authData = localStorageService.get("authorizationData");
      if (authData) {
        authContext.isAuth = true;
        authContext.userName = authData.userName;
        authContext.userFirstName = authData.userFirstName;
        authContext.userLastName = authData.userLastName;
        authContext.userId = authData.userId;
        authContext.userRoles = authData.userRoles;
      }
    }

    function getAuthContext() {
      return authContext;
    }

    function getBasicUserInfo(userName) {
      var url = apiConfig.baseApiUrl + "api/account/userinfo/" + userName;

      return $http.get(url);
    }
    
    function registerExternal(registerExternalData) {
      var deferred = $q.defer();

      var url = apiConfig.baseApiUrl + "api/account/registerexternal";

      $http.post(url, registerExternalData)
        .then(function(response) {
          authContext.isAuth = true;
          authContext.userName = response.userName;
        })
        .catch(function(error) {
          logOut();
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function setExternalAuthData(provider, userName, externalAccessToken) {
      externalAuthData.provider = provider;
      externalAuthData.userName = userName;
      externalAuthData.externalAccessToken = externalAccessToken;
    }

    function getExternalAuthData() {
      return externalAuthData;
    }
    
    function obtainAccessToken(externalData) {
      var deferred = $q.defer();

      var url = apiConfig.baseApiUrl + "api/account/ObtainLocalAccessToken";

      var params = {
        provider: externalData.provider,
        externalAccessToken: externalData.externalAccessToken
      };

      $http.get(url, { params: params })
        .then(function (response) {
          var token = response.data.access_token;
          var userName = response.data.userName;

          getBasicUserInfo(userName)
            .then(function(response) {
              localStorageService.set("authorizationData",
                {
                  token: token,
                  userName: userName,
                  userFirstName: response.data.firstName,
                  userLastName: response.data.lastName,
                  userId: response.data.id,
                  userRoles: response.data.roles
                });
              authContext.isAuth = true;
              authContext.userName = userName;
              authContext.userFirstName = response.data.firstName;
              authContext.userLastName = response.data.lastName;
              authContext.userId = response.data.id;
              authContext.userRoles = response.data.roles;
              deferred.resolve(response);
            });
        })
        .catch(function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }
  }

})();