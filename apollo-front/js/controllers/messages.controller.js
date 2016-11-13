(function () {
  angular.module("app.controllers").controller("MessagesController", MessagesController);

  MessagesController.$inject = ["messagesResponse", "messagesService", "authContext", "$uibModal", "$timeout"];

  function MessagesController(messagesResponse, messagesService, authContext, $uibModal, $timeout) {
    var vm = this;

    vm.activeIndex = 0;
    vm.activeMessage = null;
    vm.messages = [];
    vm.isConfirmationMessageVisible = false;

    vm.isMessageActive = isMessageActive;
    vm.onMessageClick = onMessageClick;
    vm.onRefreshButtonClick = onRefreshButtonClick;
    vm.onNewMessageButtonClick = onNewMessageButtonClick;

    function isMessageActive(index) {
      return index === vm.activeIndex;
    }

    function onMessageClick(index) {
      if (index !== vm.activeIndex) {
        vm.activeIndex = index;
        vm.activeMessage = vm.messages[vm.activeIndex];
      }
    }
    
    function onRefreshButtonClick() {
      messagesService
        .getMessages(authContext.userId)
        .then(function (response) {
          vm.messages = response.data;
          vm.activeIndex = 0;
          vm.activeMessage = vm.messages[vm.activeIndex];
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    function onNewMessageButtonClick() {
      openNewMessageModal()
        .result.then(function (data) {
          messagesService
            .sendMessage(
              authContext.userId,
              data.receiverId,
              data.topic,
              data.content)
            .then(function() {
              vm.isConfirmationMessageVisible = true;
              $timeout(function () {
                vm.isConfirmationMessageVisible = false;
              }, 2000);
            })
            .catch(function(error) {
              console.log(error)
            })

      })
    }

    function openNewMessageModal() {
      return $uibModal.open({
        templateUrl: "../views/new-message-modal.html",
        controller: "NewMessageModalController",
        controllerAs: "vm",
        size: "md",
        resolve: {
          receivers: function () {
            return messagesService.getReceivers(authContext.userId);
          }
        }
      });
    }

    function activate() {
      vm.messages = messagesResponse.data;
      vm.activeMessage = vm.messages[vm.activeIndex];
      console.log(messagesResponse.data);
    }

    activate();
  }
})();