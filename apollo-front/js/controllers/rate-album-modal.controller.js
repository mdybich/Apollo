(function () {
  angular.module("app.controllers").controller("RateAlbumModalController", RateAlbumModalController);

  function RateAlbumModalController($uibModalInstance, albumData, userId, rateService, currentRating) {
    var vm = this;

    vm.albumRating = 0;
    vm.artist = "";
    vm.name = "";
    vm.onSaveButtonClick = onSaveButtonClick;
    vm.onCancelButtonClick = onCancelButtonClick;

    function onSaveButtonClick() {
      rateService
        .rateAlbum(userId, albumData.id, vm.albumRating)
        .then(function () {
          $uibModalInstance.close();
        }, function () {

        });
    }
    
    function onCancelButtonClick() {
      $uibModalInstance.dismiss("cancel");
    }

    function activate() {
      vm.artist = albumData.name;
      vm.name = albumData.artist;
      vm.albumRating = currentRating.data;
    }

    activate()
  }
})();