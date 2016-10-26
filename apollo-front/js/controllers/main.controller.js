(function() {
  angular.module("app.controllers").controller("MainController", MainController);

  function MainController() {
    var vm = this;
    vm.message = "Angular works 123!";

    function activate() {
      console.log("Hello world asda!")
    }

    activate();
  }
})();