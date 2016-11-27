(function () {
  angular.module("app.controllers").controller("NewMessageModalController", NewMessageModalController);

  NewMessageModalController.$inject = ["receivers", "$uibModalInstance"];

  function NewMessageModalController(receivers, $uibModalInstance) {
    var vm = this;

    vm.receivers = [];
    vm.selectedReceiver = null;
    vm.topic = "";
    vm.content = "";
    vm.isAlreadySaveClicked = false;
    
    vm.onCancelButtonClick = onCancelButtonClick;
    vm.onSaveButtonClick = onSaveButtonClick;
    vm.isReceiverValid = isReceiverValid;
    vm.isTopicValid = isTopicValid;
    vm.isContentValid = isContentValid;
    
    function onCancelButtonClick() {
      $uibModalInstance.dismiss("cancel");
    }
    
    function onSaveButtonClick() {
      vm.isAlreadySaveClicked = true;

      if (isReceiverValid() && isTopicValid() && isContentValid()) {
        $uibModalInstance.close({
          receiverId: vm.selectedReceiver,
          topic: vm.topic,
          content: vm.content
        });
      }
    }

    function isReceiverValid() {
      return !!vm.selectedReceiver;
    }

    function isTopicValid() {
      return vm.topic && vm.topic.length > 0;
    }

    function isContentValid() {
      return vm.content && vm.content.length > 0;
    }
    
    function activate() {
      vm.receivers = receivers.data;
    }
    
    activate()
  }
})();