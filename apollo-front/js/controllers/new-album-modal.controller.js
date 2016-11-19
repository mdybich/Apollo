(function () {
  angular.module("app.controllers").controller("NewAlbumModalController", NewAlbumModalController);

  NewAlbumModalController.$inject = ["styles", "artists", "$uibModalInstance", "managementService"];

  function NewAlbumModalController(styles, artists, $uibModalInstance, managementService) {
    var vm = this;

    vm.styles = [];
    vm.artists = [];
    vm.selectedStyleId = null;
    vm.selectedArtist = null;
    vm.name = null;
    vm.year = null;
    vm.duration = null;

    vm.onCancelButtonClick = onCancelButtonClick;
    vm.onAddButtonClick = onAddButtonClick;

    function onCancelButtonClick() {
      $uibModalInstance.dismiss("cancel");
    }

    function onAddButtonClick() {
      var albumToAdd = {
        name: vm.name,
        year: vm.year,
        duration: vm.duration,
        styleId: vm.selectedStyleId
      };

      if (typeof vm.selectedArtist === "object") {
        albumToAdd.artistId = vm.selectedArtist.id;
      } else {
        albumToAdd.artistName = vm.selectedArtist;
      }

      managementService
        .addAlbum(albumToAdd)
        .then(function() {
          $uibModalInstance.close();
        })
    }



    function activate() {
      vm.styles = styles.data;
      vm.artists = artists.data;
    }

    activate();
  }
})();