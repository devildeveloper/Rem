/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  		rooms:{
  			model:'Rooms' // one to many
  		},
  		name:{
  			type:'string'
  		}
  }
};

