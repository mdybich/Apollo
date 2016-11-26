(function () {
  angular.module("app.controllers").controller("AssociateController", AssociateController);
  
  AssociateController.$inject = ["$state", "authService", "states"];
  
  function AssociateController($state, authService, states) {
    var vm = this;
    
    vm.firstName = "";
    vm.lastName = "";
    vm.userName = "";
    vm.provider = "";

    var externalAccessToken = "";

    vm.onExternalRegisterButtonClick = onExternalRegisterButtonClick;
    
    function activate() {
      var externalAuthData = authService.getExternalAuthData();
      var userInfo = externalAuthData.userName.split(" ");

      vm.firstName = userInfo[0];
      vm.lastName = userInfo[1];
      vm.provider = externalAuthData.provider;
      externalAccessToken = externalAuthData.externalAccessToken;
    }

    function onExternalRegisterButtonClick() {
      var externalLoginData = {
        userName: vm.userName,
        firstName: vm.firstName,
        lastName: vm.lastName,
        provider: vm.provider,
        externalAccessToken: externalAccessToken
      };

      authService.registerExternal(externalLoginData)
        .then(function () {
          $state.go(states.HOME);
        })
    }

    activate();
  }

})();