(function () {
  angular.module("app").config(configure).run(runBlock);

  configure.$inject = ["$stateProvider", "$urlRouterProvider", "$httpProvider", "states", "localStorageServiceProvider"];
  runBlock.$inject = ["authService"];

  function configure($stateProvider, $urlRouterProvider, $httpProvider, states, localStorageServiceProvider) {
    $stateProvider
      .state(states.COMMON, {
        templateUrl: "../views/common.html",
        abstract: true,
        controller: "CommonController",
        controllerAs: "vm",
        resolve: {
          test: function () {
          }
        }
      })
      .state(states.HOME, {
        url: "/home",
        templateUrl: "../views/home.html",
        controller: "HomeController",
        controllerAs: "vm",
        parent: states.COMMON
      });

    $urlRouterProvider.otherwise("/home");

    $httpProvider.interceptors.push('authInterceptorService');
    localStorageServiceProvider.setPrefix('Apollo');
  }

  function runBlock(authService) {
    authService.fillAuthData();
  }

})();