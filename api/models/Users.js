/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');
module.exports = {
	tableName:'Users',
  attributes: {
  		rooms:{
  			collection:'Rooms', // one to many
        via:'owner'
  		},
  		username:{
  			type:'string',
        required:true,
        unique:true
  		},
      passwd:{
        type:'string',
        required:true
      },
      role:{
        type:'string',
        enum:['basic','admin'],
        defaultsTo:'basic'
      }
  },
  //encrypt passwd
  beforeCreate: function (values, cb) {
    bcrypt.hash(values.passwd, 10, function(err, hash) {
      if(err) return cb(err);
      values.passwd = hash;
      //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
      cb();
    });
  }

};

