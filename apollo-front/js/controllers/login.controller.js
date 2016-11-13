(function () {
  angular.module("app.controllers").controller("LoginController", LoginController);

  LoginController.$inject = ["$scope", "$state", "states", "authService"];

  function LoginController($scope, $state, states, authService) {
    var vm = this;

    vm.userName = "";
    vm.password = "";
    vm.onLoginButtonClick = onLoginButtonClick;

    function onLoginButtonClick() {
      authService.login(vm.userName, vm.password)
        .then(function () {
          $scope.$emit("userLogged");
          $state.go(states.HOME);
        });
    }
  }
})();