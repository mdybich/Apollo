(function () {
  angular.module("app.controllers").controller("CommonController", CommonController);

  CommonController.$inject = ["$scope", "authContext", "authService", "$state", "states"];

  function CommonController($scope, authContext, authService, $state, states) {
    var vm = this;

    vm.stateNames = states;
    vm.isMenuActiveElement = isMenuActiveElement;
    vm.isAuth = false;
    vm.firstName = "";
    vm.lastName = "";
    vm.onLogoutButtonClick = onLogoutButtonClick;

    function isMenuActiveElement(stateName) {
      return $state.current.name === stateName;
    }

    function onLogoutButtonClick() {
      authService.logOut();
      getDataFromAuthContext();
      $scope.$broadcast("userLoggedOut");
      $state.go(states.HOME);
    }

    function activate() {
      getDataFromAuthContext();
    }

    $scope.$on("userLogged", function () {
      getDataFromAuthContext();
    });

    function getDataFromAuthContext() {
      vm.isAuth = authContext.isAuth;
      vm.firstName = authContext.userFirstName;
      vm.lastName = authContext.userLastName;
    }

    activate();
  }
})();