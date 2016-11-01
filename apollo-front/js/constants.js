(function () {
  angular.module("app")
    .constant("states", {
      COMMON: "common",
      HOME: "home"
    })
    .constant("apiConfig", {
      baseApiUrl: "http://localhost:47"
    })
})();