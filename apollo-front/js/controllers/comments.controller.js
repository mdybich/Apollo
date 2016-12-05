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
    vm.isAdmin = false;
    vm.editCommentId = null;
    vm.editableComment = {};
    
    vm.onNewCommentButtonClick = onNewCommentButtonClick;
    vm.isCommentValid = isCommentValid;
    vm.onEditButtonClick = onEditButtonClick;
    vm.onCancelEditCommentButtonClick = onCancelEditCommentButtonClick;
    vm.onSaveButtonClick = onSaveButtonClick;
    
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

    function onEditButtonClick(comment) {
      vm.editCommentId = comment.id;
      vm.editableComment = {
        id: comment.id,
        content: comment.content
      }
    }

    $scope.$on("userLoggedOut", function () {
      vm.isUserAuth = false;
    });

    function isAdmin() {
      var roles = authContext.userRoles;

      for (var i = 0; roles.length; i++) {
        if (roles[i] === "Admin") {
          return true;
        }
      }
      return false;
    }

    function onCancelEditCommentButtonClick() {
      vm.editCommentId = null;
      vm.editableComment = {};
    }

    function onSaveButtonClick() {
      commentsService
        .editComment(vm.editableComment)
        .then(function() {
          onEditCommentSuccess();
        })
        .catch(function(error) {
          console.log(error)
        })
    }

    function onEditCommentSuccess() {
      for (var i = 0; i < vm.comments.length; i++) {
        if (vm.comments[i].id === vm.editCommentId) {
          vm.comments[i].content = vm.editableComment.content;
          break;
        }
      }

      vm.editableComment = {};
      vm.editCommentId = null;
    }

    function activate() {
      vm.isUserAuth = authContext.isAuth;
      vm.isAdmin = isAdmin();
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