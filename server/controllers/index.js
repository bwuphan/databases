var models = require('../models');
var url = require('url');
var express = require('express');
var app = express();
var parser = require('body-parser');




module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(data) {
        console.log('helloooo')
        console.log(data);
        res.json(data)
      });
        // res.send("Hello World");
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body, function(data) {
        res.json(data);
      });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(function(data) {
        res.json(data);
      })
    },
    post: function (req, res) {
      models.users.post(req.body, function(data) {
        res.json(data)
      })
    }
  }
};

