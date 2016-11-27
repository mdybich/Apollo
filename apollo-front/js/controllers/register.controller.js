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
    vm.isAlreadySaveClicked = false;

    vm.onRegisterButtonClick = onRegisterButtonClick;
    vm.isUserNameValid = isUserNameValid;
    vm.isFirstNameValid = isFirstNameValid;
    vm.isLastNameValid = isLastNameValid;
    vm.isPasswordValid = isPasswordValid;
    vm.isPasswordConfirmationValid = isPasswordConfirmationValid;
    vm.arePasswordsTheSame = arePasswordsTheSame;

    function onRegisterButtonClick() {
      vm.isAlreadySaveClicked = true;

      if (isUserNameValid() && isFirstNameValid() && isLastNameValid() && isPasswordValid() && isPasswordConfirmationValid() && arePasswordsTheSame()) {
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

    function isUserNameValid() {
      return vm.userName && vm.userName.length > 0;
    }

    function isFirstNameValid() {
      return vm.firstName && vm.firstName.length > 0;
    }

    function isLastNameValid() {
      return vm.lastName && vm.lastName.length > 0;
    }

    function isPasswordValid() {
      return vm.password && vm.password.length >= 8;
    }

    function isPasswordConfirmationValid() {
      return vm.passwordConfirmation && vm.passwordConfirmation.length >= 8;
    }

    function arePasswordsTheSame() {
      return vm.password === vm.passwordConfirmation;
    }
  }
})();