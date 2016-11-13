(function () {
  angular.module("app.controllers").controller("NewMessageModalController", NewMessageModalController);

  NewMessageModalController.$inject = ["receivers", "$uibModalInstance"];

  function NewMessageModalController(receivers, $uibModalInstance) {
    var vm = this;

    vm.receivers = [];
    vm.selectedReceiver = null;
    vm.topic = "";
    vm.content = "";
    
    vm.onCancelButtonClick = onCancelButtonClick;
    vm.onSaveButtonClick = onSaveButtonClick;
    
    function onCancelButtonClick() {
      $uibModalInstance.dismiss("cancel");
    }
    
    function onSaveButtonClick() {
      $uibModalInstance.close({
        receiverId: vm.selectedReceiver,
        topic: vm.topic,
        content: vm.content
      });
    }
    
    function activate() {
      vm.receivers = receivers.data;
    }
    
    activate()
  }
})();