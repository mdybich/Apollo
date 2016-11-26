(function () {
  angular.module("app.controllers").controller("LoginController", LoginController);

  LoginController.$inject = ["$scope", "$state", "states", "authService", "apiConfig"];

  function LoginController($scope, $state, states, authService, apiConfig) {
    var vm = this;

    vm.userName = "";
    vm.password = "";
    vm.onLoginButtonClick = onLoginButtonClick;
    vm.onExternalLoginButtonClick = onExternalLoginButtonClick;

    function onLoginButtonClick() {
      authService.login(vm.userName, vm.password)
        .then(function () {
          $scope.$emit("userLogged");
          $state.go(states.HOME);
        });
    }

    function onExternalLoginButtonClick(provider) {
      var redirectUri = "http://localhost:4000/redirect.html";

      var externalProviderUrl = apiConfig.baseApiUrl + "api/Account/ExternalLogin?provider=" + provider
        + "&response_type=token&client_id=Apollo"
        + "&redirect_uri=" + redirectUri;

      $scope.authCompletedCB = function (fragment) {

        $scope.$apply(function () {

          if (fragment.haslocalaccount === 'False') {
            authService.logOut();
            authService.setExternalAuthData(fragment.provider, fragment.external_user_name, fragment.external_access_token);

            $state.go(states.ASSOCIATE);
          }
          else {
            var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
            authService.obtainAccessToken(externalData).then(function () {
                $scope.$emit('userLogged');
                $state.go(states.HOME);
              },
              function (err) {
                $scope.message = err.error_description;
              });
          }

        });
      };

      window.$windowScope = $scope;

      var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
    }
  }
})();