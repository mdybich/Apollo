(function () {
  angular.module("app.services").factory("messagesService", messagesService);

  messagesService.$inject = ["$http", "apiConfig"];

  function messagesService($http, apiConfig) {
    var messagesService = {
      getMessages: getMessages,
      sendMessage: sendMessage,
      getReceivers: getReceivers
    };

    return messagesService;

    function getMessages(userId) {
      var url = apiConfig.baseApiUrl + "api/message/get/" + userId;

      return $http.get(url);
    }

    function sendMessage(senderId, receiverId, topic, content) {
      var url = apiConfig.baseApiUrl + "api/message/send";
      var data = {
        senderId: senderId,
        receiverId: receiverId,
        topic: topic,
        content: content
      };

      return $http.post(url, data);
    }

    function getReceivers(userId) {
      var url = apiConfig.baseApiUrl + "api/message/receivers/" + userId;

      return $http.get(url);
    }
  }
})();