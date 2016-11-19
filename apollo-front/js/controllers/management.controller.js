(function () {
  angular.module("app.controllers").controller("ManagementController", ManagementController);

  ManagementController.$inject = ["managementAlbumsResponse", "$uibModal", "managementService", "styleService"];

  function ManagementController(managementAlbumsResponse, $uibModal, managementService, styleService) {
    var vm = this;

    vm.albums = [];
    vm.onDeleteButtonClick = onDeleteButtonClick;
    vm.onAddButtonClick = onAddButtonClick;

    function onDeleteButtonClick(albumId, albumName, albumArtist) {
      openDeleteAlbumModal(albumId, albumName, albumArtist)
        .result.then(function() {
          refreshAlbums();
      })
    }

    function onAddButtonClick() {
      openAddAlbumModal()
        .result.then(function () {
          refreshAlbums();
      })
    }

    function refreshAlbums() {
      managementService
        .getAlbums()
        .then(function(result) {
          vm.albums = result.data;
        })
    }

    function openDeleteAlbumModal(albumId, albumName, albumArtist) {
      return $uibModal.open({
        templateUrl: "../views/delete-album-modal.html",
        controller: "DeleteAlbumModalController",
        controllerAs: "vm",
        size: "md",
        resolve: {
          albumData: function () {
            return {
              id: albumId,
              name: albumName,
              artist: albumArtist
            }
          }
        }
      });
    }

    function openAddAlbumModal() {
      return $uibModal.open({
        templateUrl: "../views/new-album-modal.html",
        controller: "NewAlbumModalController",
        controllerAs: "vm",
        size: "md",
        resolve: {
          styles: styleService.getStyles(),
          artists: managementService.getArtists()
        }
      });
    }

    function activate() {
      vm.albums = managementAlbumsResponse.data;
    }

    activate();
  }
})();