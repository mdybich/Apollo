(function () {
  angular.module("app.controllers").controller("RateAlbumModalController", RateAlbumModalController);

  function RateAlbumModalController($uibModalInstance, albumData, userId, rateService, currentRating) {
    var vm = this;

    vm.albumRating = 0;
    vm.artist = "";
    vm.name = "";
    vm.isAlreadySaveClicked = false;

    vm.onSaveButtonClick = onSaveButtonClick;
    vm.onCancelButtonClick = onCancelButtonClick;
    vm.isCorrectRating = isCorrectRating;

    function onSaveButtonClick() {
      vm.isAlreadySaveClicked = true;

      if(isCorrectRating()) {
        rateService
          .rateAlbum(userId, albumData.id, vm.albumRating)
          .then(function () {
            $uibModalInstance.close();
          }, function () {

          });
      }
    }
    
    function onCancelButtonClick() {
      $uibModalInstance.dismiss("cancel");
    }

    function activate() {
      vm.artist = albumData.name;
      vm.name = albumData.artist;
      vm.albumRating = currentRating.data;
    }

    function isCorrectRating() {
      return vm.albumRating && vm.albumRating > 0 && vm.albumRating <= 10;
    }

    activate()
  }
})();