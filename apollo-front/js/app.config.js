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
          authContext: getAuthContext
        }
      })
      .state(states.HOME, {
        url: "/home",
        templateUrl: "../views/home.html",
        controller: "HomeController",
        controllerAs: "vm",
        parent: states.COMMON
      })
      .state(states.LOGIN, {
        url: "/login",
        templateUrl: "../views/login.html",
        controller: "LoginController",
        controllerAs: "vm",
        parent: states.COMMON
      })
      .state(states.REGISTER, {
        url: "/register",
        templateUrl: "../views/register.html",
        controller: "RegisterController",
        controllerAs: "vm",
        parent: states.COMMON
      })
      .state(states.COMMENTS, {
        url: "/comments/{id}",
        templateUrl: "../views/comments.html",
        controller: "CommentsController",
        controllerAs: "vm",
        parent: states.COMMON,
        resolve: {
          commentsResponse: getComments
        }
      })
      .state(states.MESSAGES, {
        url: "/messages",
        templateUrl: "../views/messages.html",
        controller: "MessagesController",
        controllerAs: "vm",
        parent: states.COMMON,
        resolve: {
          messagesResponse: getMessages
        }
      })
      .state(states.MANAGEMENT, {
        url: "/management",
        templateUrl: "../views/management.html",
        controller: "ManagementController",
        controllerAs: "vm",
        parent: states.COMMON,
        resolve: {
          managementAlbumsResponse: getManagementAlbums
        }
      })
      .state(states.RECOMMENDATIONS, {
        url: "/recommendations",
        templateUrl: "../views/recommendations.html",
        controller: "RecommendationsController",
        controllerAs: "vm",
        parent: states.COMMON,
        resolve: {
          recommendationsResponse: getRecommendations
        }
      })
      .state(states.ASSOCIATE, {
        url: "/associate",
        templateUrl: "../views/associate.html",
        controller: "AssociateController",
        controllerAs: "vm",
        parent: states.COMMON
      });

    $urlRouterProvider.otherwise("/home");

    $httpProvider.interceptors.push('authInterceptorService');
    localStorageServiceProvider.setPrefix('Apollo');
  }

  function getAuthContext(authService) {
    return authService.getAuthContext();
  }
  
  function getComments($stateParams, commentsService) {
    return commentsService.getComments($stateParams.id);
  }

  function getMessages(messagesService, authContext) {
    if (authContext.isAuth) {
      return messagesService.getMessages(authContext.userId);
    } else {
      throw "error";
    }
  }

  function getManagementAlbums(managementService, authContext) {
    if (authContext.isAuth) {
      return managementService.getAlbums();
    }
    throw "error";
  }

  function getRecommendations(searchService, authContext) {
    if (authContext.isAuth) {
      return searchService.getRecommendations(authContext.userId);
    }
    throw "error";
  }

  function runBlock(authService) {
    authService.fillAuthData();
  }

})();