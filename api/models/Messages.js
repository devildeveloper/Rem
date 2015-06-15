/**
* Messages.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName:'Messages',
  attributes: {
  	room:{
  		model:'Rooms' //one to many
  	},
  	owner:{
  		model:'Users' //one to many
  	},
  	body:{
  		type:'string'
  	}
  }
};

