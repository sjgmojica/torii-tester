
(function ($) {
  let uri = $("#global-config").data("torii-uri");

  // --> Authorize
  $("#authorize_link").click(function () {
    const redirectUri = $("#redirectUri").val();
    const clientId = $("#clientId").val();
    window.open(uri + "/oauth2/authorize?response_type=code&client_id=" + clientId + "&redirect_uri=" + redirectUri, "blank");
  });

  // --> Token Exchange
  $("#token_id").click(function () {
    const code = $("#authCode").val();
    const redirectUri = $("#redirectUri").val();
    const clientSecret = $("#clientSecret").val();
    const clientId = $("#clientId").val();
    $.post("/token", {grantType: "authorization_code", redirectUri: redirectUri, code: code, clientId: clientId, clientSecret: clientSecret}, function (data) {
      $("#accesstoken_result").text(JSON.stringify(data));
    });
  });


  // --> Client Credentials
  $("#credential_id").click(function () {
    const clientSecret = $("#clientSecret").val();
    const clientId = $("#clientId").val();
    $.post("/token", {grantType: "client_credentials", clientId: clientId, clientSecret: clientSecret}, function (data) {
      $("#accesstoken_result").text(JSON.stringify(data));
    });
  });

  // --> X Client Credentials
  $("#x_credential_id").click(function () {
    const user = $("#x_client_credentials_param").val()
    const clientSecret = $("#clientSecret").val();
    const clientId = $("#clientId").val();
    $.post("/token", {grantType: "x_client_credentials", user: JSON.parse(user), clientId: clientId, clientSecret: clientSecret}, function (data) {
      $("#accesstoken_result").text(JSON.stringify(data));
    });
  });

  // --> Refresh Token
  $("#refresh_id").click(function () {
    const refreshToken = $("#refreshTokenParam").val();
    const clientSecret = $("#clientSecret").val();
    const clientId = $("#clientId").val();
    $.post("/token", {grantType: "refresh_token", refreshToken: refreshToken, clientId: clientId, clientSecret: clientSecret}, function (data) {
      $("#accesstoken_result").text(JSON.stringify(data));
    });
  });

  // --> Get SSO Profile
  $("#profile_id").click(function() {
    const accessToken = $("#accessTokenParam").val();
    $.post("/profile", {accessToken: accessToken}, function(data) {
      $("#accesstoken_result").text(JSON.stringify(data));
    });
  });

})(jQuery);