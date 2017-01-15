var db = require('../db');
var url = require('url');
var mysql = require('mysql');
//var mySQLClient = require('mysql-js')

var sqlQueries = {
  usrMsgRm: 'select messages.id, users.username, messages.message, rooms.roomname from messages join users join rooms where messages.user_id=users.id and messages.room_id=rooms.id;',
  usrs: 'select * from users',
  inserterMsg: 'insert into messages(id, message, room_id, user_id) values(null,'
}

var insertMessage = function(username, message, roomname, callback) {
  var queryInsert = sqlQueries.inserterMsg + '"' + message + '",' + '(select id from rooms where roomname=' + "'" + roomname + "'" + '), (select id from users where username=' + "'" + username + "'" + '));';
  db.query(queryInsert, function(err, data)  {
    if (err) {
      console.log('error here');
      throw err;
    } else {
      callback(data);
    }
  })
}
// insert into users (id, username) values(null, 'bobby');

// [7:51]
// insert into rooms (id, roomname) values(null, 'default);

// [7:51]
// insert into messages(id, message, room_id, user_id) values(null, 'hello world', 1, 1);

db.connect(function(err) {
  if(err) {
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
})

module.exports = {
  messages: {
    get: function (callback)  {
      db.query(sqlQueries.usrMsgRm, function(err, data)  {
        if (err) {
          throw err;
        } else {
          console.log(data);
          callback(data);
        }
      })
    }, // a function which produces all the messages
    post: function (request, callback) {
      // a function which can be used to insert a message into the database

      //get request body info...username, messages, roomname
      //save that info to variables
      //use sql db commands and insert it into our database

      var username = request.username;
      var message = request.message;
      var roomname = request.roomname;
      var queryInsert = sqlQueries.inserterMsg + '"' + message + '",' + '(select id from rooms where roomname=' + "'" + roomname + "'" + '), (select id from users where username=' + "'" + username + "'" + '));'
      console.log(roomname)
      //insert into users (id, username) values(null, 'bobby');

      //Checks if new user, if new user, insert into user. else do nothing
      db.query('select id from users where username="' + username + '";', function(err, data) {
        if(data.length === 0) {
          db.query('insert into users (id,username) values(null,"' + username + '");', function(err, moreData) {
            console.log(moreData)
          });
        }
      });

      //Check if new room, if new room, insert into rooms. else do nothing
      db.query('select id from rooms where roomname="' + roomname + '";', function(err, data) {
        if(data.length === 0) {
          db.query('insert into rooms (id,roomname) values(null,"' + roomname + '");', function(err, moreData) {
            console.log('insert into rooms (id,roomname) values(null,"' + roomname + '");')
            console.log(moreData)
          });
        }
      });
      setTimeout(function(){
        insertMessage(username, message, roomname, callback)
      }, 1000)
      // db.query(queryInsert, function(err, data)  {
      //   if (err) {
      //     throw err;
      //   } else {
      //     callback(data);
      //   }
      // })
    }
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.query(sqlQueries.usrs, function(err, data) {
        if (err) {
          throw err;
        } else {
          callback(data);
        }
      })

    },
    post: function (request, callback) {
      var username = request.json.username;
      db.query('select id from users where username="' + username + '";', function(err, data) {
        if(data.length === 0) {
          db.query('insert into users (id,username) values(null,"' + username + '");', function(err, moreData) {
            console.log(moreData)
          });
        }
      });
    }
  }
};

