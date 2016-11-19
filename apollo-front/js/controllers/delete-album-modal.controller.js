(function () {
  angular.module("app.controllers").controller("DeleteAlbumModalController", DeleteAlbumModalController);

  DeleteAlbumModalController.$inject = ["albumData", "$uibModalInstance", "managementService"];

  function DeleteAlbumModalController(albumData, $uibModalInstance, managementService) {
    var vm = this;
    vm.name = "";
    vm.artist = "";

    vm.onDeleteButtonClick = onDeleteButtonClick;
    vm.onCancelButtonClick = onCancelButtonClick;

    function onDeleteButtonClick() {
      managementService
        .deleteAlbum(albumData.id)
        .then(function () {
          $uibModalInstance.close();
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    function onCancelButtonClick() {
      $uibModalInstance.dismiss("cancel");
    }

    function activate() {
      vm.name = albumData.name;
      vm.artist = albumData.artist;
    }

    activate();
  }
})();