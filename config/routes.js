module.exports.routes = {
  "GET /"                 : { view: "oauth/token"},
  "POST /token"           : "Oauth.token",
  "POST /profile"         : "Oauth.profile" 
};
