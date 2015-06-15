/**
* Rooms.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	tableName:'Rooms',
	attributes: {
		messages:{
			columnName:'Messages',
			collection:'Messages'
		},
		users:{
			columnName:'Users',
			collection:'Users'
		},
		owner:{
			model:'Users', // one to many
			required:true
		}
	}
};

