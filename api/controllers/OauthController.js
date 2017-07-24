"use strict";
var request = require("request");
var _ = require("lodash");

module.exports = {

  token: (req, res) => {
    var param = null;
    const grantType = req.param("grantType");
    const redirectUri = req.param("redirectUri");
    const url = _.get(sails.config, "torii.uri") + "/oauth2/token";

    switch (grantType) {

      case "authorization_code":
        param = {
          headers: { 
            "Content-Type" : "application/json",
            "Accept" : "application/json"
          },
          method: "POST",
          uri: _.clone(url),
          auth : {
            username : req.param("clientId"),
            password : req.param("clientSecret")
          },
          json: {
            "grant_type" : "authorization_code",
            "code" : req.param("code"),
            "redirect_uri" : req.param("redirectUri")
          } 
        };
 
        request(param, (err, result, body) => {
          return res.json(body);
        });
      break;

      case "client_credentials":
        param = {
          headers: { 
            "Content-Type" : "application/json",
            "Accept" : "application/json"
          },
          method: "POST",
          uri: _.clone(url),
          auth : {
            username : req.param("clientId"),
            password : req.param("clientSecret")
          },
          json: {
            "grant_type" : "client_credentials"
          } 
        };

        request(param, (err, result, body) => {
          return res.json(body);
        });
      break;

      case "x_client_credentials":
        param = {
          headers: { 
            "Content-Type" : "application/json",
            "Accept" : "application/json"
          },
          method: "POST",
          uri: _.clone(url),
          auth : {
            username : req.param("clientId"),
            password : req.param("clientSecret")
          },
          json: {
            "grant_type" : "x_client_credentials",
            "user" : req.param("user")
          } 
        };

        request(param, (err, result, body) => {
          return res.json(body);
        });
      break;

      case "refresh_token":
        param = {
          headers: { 
            "Content-Type" : "application/json",
            "Accept" : "application/json"
          },
          method: "POST",
          uri: _.clone(url),
          auth : {
            username : req.param("clientId"),
            password : req.param("clientSecret")
          },
          json: {
            "grant_type" : "refresh_token",
            "refresh_token" : req.param("refreshToken")
          } 
        };

        request(param, (err, result, body) => {
          return res.json(body);
        });
      break;

    };
  },

  profile: (req, res) => {
    const url = _.get(sails.config, "torii.uri") + "/v1/profile";
    const accessToken = req.param("accessToken");
    const param = {
      method: "GET",
      uri: _.clone(url),
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json",
        "Authorization" : "bearer " + accessToken 
      }
    };

    request(param, (err, result, body) => {
      return res.json(body);
    });
  }

};

