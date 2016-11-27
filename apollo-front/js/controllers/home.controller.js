(function () {
  angular.module("app.controllers").controller("HomeController", HomeController);

  HomeController.$inject = ["$scope", "authContext", "searchService", "$uibModal", "styleService", "rateService"];

  function HomeController($scope, authContext, searchService, $uibModal, styleService, rateService) {
    var vm = this;

    vm.albums = [];
    vm.styles = [];
    vm.isLoading = false;
    vm.isUserAuth = false;
    vm.searchText = "";
    vm.isAdvancedSearchVisible = false;
    vm.selectedStyle = null;
    vm.advancedSearch = {
      name: null,
      artist: null,
      styleId: null,
      yearFrom: null,
      yearTo: null,
      ratingFrom: null,
      ratingTo: null
    };
    vm.orderOptions = [];
    vm.orderDirections = [];
    vm.selectedOrderOption = "totalRating";
    vm.selectedOrderDirection = "desc";


    vm.onRateButtonClick = onRateButtonClick;
    vm.changeSearchView = changeSearchView;
    vm.onAdvancedSearchButtonClick = onAdvancedSearchButtonClick;
    vm.isDescendingOrderDirection = isDescendingOrderDirection;

    function onRateButtonClick(albumId, albumName, albumArtist) {
      openRateModal(albumId, albumName, albumArtist)
        .result.then(function () {
        if (vm.searchText.length && vm.searchText.length > 3) {
          searchAlbums(vm.searchText);
        } else {
          loadTopAlbums();
        }
      })
    }

    function changeSearchView() {
      vm.isAdvancedSearchVisible = !vm.isAdvancedSearchVisible;
      if (!vm.isAdvancedSearchVisible) {
        vm.searchText = "";
        loadTopAlbums();
      }
    }

    function onAdvancedSearchButtonClick() {
      vm.isLoading = true;
      searchService
        .advancedSearch(vm.advancedSearch)
        .then(function(result) {
          vm.albums = result.data;
        }, function (error) {
          console.log(error);
        })
        .finally(function () {
          vm.isLoading = false;
        })
    }

    function isDescendingOrderDirection() {
      return vm.selectedOrderDirection === "desc"
    }

    function openRateModal(albumId, albumName, albumArtist) {
      return $uibModal.open({
        templateUrl: "../views/rate-album-modal.html",
        controller: "RateAlbumModalController",
        controllerAs: "vm",
        size: "md",
        resolve: {
          albumData: function () {
            return {
              id: albumId,
              name: albumName,
              artist: albumArtist
            }
          },
          userId: function () {
            return authContext.userId
          },
          currentRating: function () {
            return rateService
              .getCurrentRating(authContext.userId, albumId);
          }
        }
      });
    }

    function loadTopAlbums() {
      vm.isLoading = true;
      searchService.getTopAlbums()
        .then(function(result) {
          vm.albums = result.data;
        }, function(error) {
          console.log(error);
        })
        .finally(function () {
          vm.isLoading = false;
        })
    }

    function loadStyles() {
      styleService.getStyles()
        .then(function (result) {
          vm.styles = result.data;
        }, function (error) {
          console.log(error);
        })
    }

    function searchAlbums(text) {
      vm.isLoading = true;
      searchService
        .search(text)
        .then(function(result) {
          vm.albums = result.data;
        }, function(error) {
          console.log(error);
        })
        .finally(function () {
          vm.isLoading = false;
        })
    }

    function getOrderOptions() {
      return [
        { type: "totalRating", label: "Ocenie"},
        { type: "artist", label: "Wykonawcy"},
        { type: "name", label: "Nazwie"},
        { type: "year", label: "Roku"},
        { type: "style", label: "Stylu"}
      ];
    }

    function getOrderDirections() {
      return [
        { type: "desc", label: "Malejąco"},
        { type: "asc", label: "Rosnąco"}
      ];
    }

    $scope.$watch(function() {
      return vm.searchText;
    }, function (newValue, oldValue) {
      if (newValue === "" || !newValue) {
        loadTopAlbums()
      } else if (newValue && newValue !== "" && newValue.length > 3 && newValue !== oldValue) {
        searchAlbums(newValue)
      }

    });

    $scope.$on("userLoggedOut", function () {
      vm.isUserAuth = false;
    });

    function activate() {
      vm.isUserAuth = authContext.isAuth;
      loadTopAlbums();
      loadStyles();
      vm.orderOptions = getOrderOptions();
      vm.orderDirections = getOrderDirections();
    }

    activate();
  }
})();