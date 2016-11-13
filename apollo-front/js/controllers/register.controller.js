(function () {
  angular.module("app.controllers").controller("RegisterController", RegisterController);

  RegisterController.$inject = ["authService"];

  function RegisterController(authService) {
    var vm = this;

    vm.userName = "";
    vm.firstName = "";
    vm.lastName = "";
    vm.password = "";
    vm.passwordConfirmation = "";
    vm.isSuccessRegistered = false;

    vm.onRegisterButtonClick = onRegisterButtonClick;

    function onRegisterButtonClick() {
      authService.register({
        userName: vm.userName,
        firstName: vm.firstName,
        lastName: vm.lastName,
        password: vm.password,
        confirmPassword: vm.passwordConfirmation
      })
        .then(function () {
          vm.isSuccessRegistered = true;
        }, function (error) {
          console.log(error);
        })
    }
  }
})();