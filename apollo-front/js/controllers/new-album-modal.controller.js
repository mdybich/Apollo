(function () {
  angular.module("app.controllers").controller("NewAlbumModalController", NewAlbumModalController);

  NewAlbumModalController.$inject = ["styles", "artists", "$uibModalInstance", "managementService"];

  function NewAlbumModalController(styles, artists, $uibModalInstance, managementService) {
    var vm = this;

    vm.styles = [];
    vm.artists = [];
    vm.selectedStyleId = null;
    vm.selectedArtist = null;
    vm.name = "";
    vm.year = null;
    vm.duration = null;
    vm.isAlreadySaveClicked = false;

    vm.onCancelButtonClick = onCancelButtonClick;
    vm.onAddButtonClick = onAddButtonClick;
    vm.isNameValid = isNameValid;
    vm.isArtistValid = isArtistValid;
    vm.isStyleValid = isStyleValid;
    vm.isYearValid = isYearValid;
    vm.isDurationValid = isDurationValid;

    function onCancelButtonClick() {
      $uibModalInstance.dismiss("cancel");
    }

    function onAddButtonClick() {
      vm.isAlreadySaveClicked = true;
      if (isNameValid() && isArtistValid() && isStyleValid() && isYearValid() && isDurationValid()) {
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
    }

    function isNameValid() {
      return vm.name && vm.name.length > 0;
    }

    function isArtistValid() {
      if (vm.selectedArtist) {
        if (typeof vm.selectedArtist === "object") {
          return !!vm.selectedArtist;
        } else {
          return !!vm.selectedArtist && vm.selectedArtist.length > 0;
        }
      }

      return false;
    }

    function isStyleValid() {
      return vm.selectedStyleId !== null && vm.selectedStyleId !== undefined;
    }

    function isYearValid() {
      return vm.year && vm.year > 0;
    }

    function isDurationValid() {
      return vm.duration && vm.duration > 0;
    }

    function activate() {
      vm.styles = styles.data;
      vm.artists = artists.data;
    }

    activate();
  }
})();