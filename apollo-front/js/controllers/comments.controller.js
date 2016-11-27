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
    vm.isAlreadySaveClicked = false;
    
    vm.onNewCommentButtonClick = onNewCommentButtonClick;
    vm.isCommentValid = isCommentValid;
    
    function onNewCommentButtonClick() {
      vm.isAlreadySaveClicked = true;

      if (isCommentValid()) {
        commentsService
          .addComment(authContext.userId, vm.albumId, vm.newComment)
          .then(function() {
            vm.newComment = "";
            vm.isAlreadySaveClicked = false;
            refreshComments();
          })
          .catch(function (error) {
            console.log(error);
          })
      }
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

    function isCommentValid() {
      return vm.newComment && vm.newComment.length >= 10;
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