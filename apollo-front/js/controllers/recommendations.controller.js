(function () {
  angular.module("app.controllers").controller("RecommendationsController", RecommendationsController);

  RecommendationsController.$inject = ["recommendationsResponse"];

  function RecommendationsController(recommendationsResponse) {
    var vm = this;

    vm.albums = [];

    function activate() {
      vm.albums = recommendationsResponse.data;
    }

    activate();
  }
})();