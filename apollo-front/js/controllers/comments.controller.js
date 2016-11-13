(function () {
  angular.module("app.controllers").controller("CommentsController", CommentsController);

  CommentsController.$inject = ["$scope", "commentsResponse", "authContext", "commentsService"];

  function CommentsController($scope, commentsResponse, authContext, commentsService) {
    var vm = this;

    vm.comments = [];
    vm.albumId = null;
    vm.albumName = "";
    vm.artistName = "";
    vm.newComment = "";
    vm.isUserAuth = false;
    
    vm.onNewCommentButtonClick = onNewCommentButtonClick;
    
    function onNewCommentButtonClick() {
      commentsService
        .addComment(authContext.userId, vm.albumId, vm.newComment)
        .then(function() {
          vm.newComment = "";
          refreshComments();
        })
        .catch(function (error) {
          console.log(error);
        })

    }

    function refreshComments() {
      commentsService
        .getComments(vm.albumId)
        .then(function (response) {
          vm.comments = response.data.comments;
        })
        .catch(function (error) {
          console.log(error)
        })
    }

    $scope.$on("userLoggedOut", function () {
      vm.isUserAuth = false;
    });


    function activate() {
      vm.isUserAuth = authContext.isAuth;
      var data = commentsResponse.data;
      if (data) {
        vm.comments = data.comments;
        vm.albumName = data.albumName;
        vm.artistName = data.artistName;
        vm.albumId = data.albumId;
      }
    }

    activate();
  }
  
})();