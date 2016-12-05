(function () {
  angular.module("app.services").factory("commentsService", commentsService);

  commentsService.$inject = ["$http", "apiConfig"];
  
  function commentsService($http, apiConfig) {
    var commentsService = {
      getComments: getComments,
      addComment: addComment,
      editComment: editComment
    };
    
    return commentsService;
    
    function getComments(albumId) {
      var url = apiConfig.baseApiUrl + "api/comment/get/" + albumId;
      return $http.get(url);
    }

    function addComment(userId, albumId, content) {
      var url = apiConfig.baseApiUrl + "api/comment/add";
      var data = {
        userId: userId,
        albumId: albumId,
        content: content
      };

      return $http.post(url, data);
    }

    function editComment(data) {
      var url = apiConfig.baseApiUrl + "api/comment/edit";

      return $http.post(url, data);
    }
  }
})();