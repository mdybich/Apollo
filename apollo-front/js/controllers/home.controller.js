(function () {
  angular.module("app.controllers").controller("HomeController", HomeController);

  function HomeController() {
    function activate() {
      alert("Hello from home controller!");
    }

    activate();
  }
})();