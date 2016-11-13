(function () {
  angular.module("app")
    .constant("states", {
      COMMON: "common",
      HOME: "home",
      LOGIN: "login",
      REGISTER: "register",
      COMMENTS: "comments",
      MESSAGES: "messages"
    })
    .constant("apiConfig", {
      baseApiUrl: "http://localhost:47131/"
    })
})();