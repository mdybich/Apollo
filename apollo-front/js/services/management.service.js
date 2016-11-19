(function () {
  angular.module("app.services").factory("managementService", managementService);

  managementService.$inject = ["$http", "apiConfig"];

  function managementService($http, apiConfig) {
    var managementService = {
      getAlbums: getAlbums,
      addAlbum: addAlbum,
      deleteAlbum: deleteAlbum,
      getArtists: getArtists
    };

    return managementService;

    function getAlbums() {
      var url = apiConfig.baseApiUrl + "api/management/albums";

      return $http.get(url);
    }

    function addAlbum(albumToAdd) {
      var url = apiConfig.baseApiUrl + "api/management/add";

      return $http.post(url, albumToAdd);
    }

    function deleteAlbum(albumId) {
      var url = apiConfig.baseApiUrl + "api/management/delete";

      return $http.delete(url, {params: {id: albumId}});
    }

    function getArtists() {
      var url = apiConfig.baseApiUrl + "api/management/artists";

      return $http.get(url);
    }
  }
})();