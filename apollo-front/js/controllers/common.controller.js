(function () {
  angular.module("app.controllers").controller("CommonController", CommonController);

  CommonController.$inject = ["$state", "states"];

  function CommonController($state, states) {
    var vm = this;

    vm.stateNames = states;
    vm.isMenuActiveElement = isMenuActiveElement;

    function isMenuActiveElement(stateName) {
      return $state.current.name === stateName;
    }

  }
})();