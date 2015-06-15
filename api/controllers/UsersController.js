/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var passport = require('passport');
module.exports = {
	createUser:function(req,res){
		if(req.param('username') && req.param('passwd') ){
			Users.findOrCreate({username:req.param('username')},{username:req.param('username') , passwd:req.param('passwd') })
				.exec(function(err,user){
					if(err) return res.json({err:err,success:false});
					return res.ok('user saved.')
				})
		}
	},
	createAdmin:function(req,res){
		console.log(req.allParams())
		if(req.param('username') && req.param('passwd') &&  req.param('role') ) {
			Users.findOrCreate({username:req.param('username')},{username:req.param('username') , passwd:req.param('passwd') , role:'admin'})
				.exec(function(err,user){
					if(err) return res.json({err:err,success:false});
					return res.ok('user saved.')
				})
		}
	}	
	,findUser:function(req,res){
		if(req.params.userId){
			Users.findOne({username:req.params.userId})
					.exec(function(err,user){
						if(err) return res.json({err:err,success:false});
						return res.json({err:null,user:user});
					});
		}else{
			Users.find()
					.exec(function(err,users){
						if(err) res.json({err:err,success:false});
						return res.json({err:null,users:users});
					});			
		}
	},
	createRoom:function(req,res){
		console.log(req.user.id)
		Rooms.create({owner:req.user.id})
				.exec(function(err,room){
					if(err) return res.json({err:err,success:false});
					return res.json({err:null,room:room});
				});
	},
	myRooms:function(req,res){
		console.log('loo')
		console.log(req.user.id)
		console.log('miau');
		Users.find({id:req.user.id})
				.populate('rooms')
				.exec(function(err,rooms){
					if(err) return res.json({err:err,success:false});
					if(rooms)return res.json({err:null,rooms:rooms});
					return res.json({err:err,rooms:'no rooms found'});
				});
	},
	//passport login
	login:function(req,res){
		passport.authenticate('local',function(err,user,info){
			if( err || !user) return res.send({ message:info.message, user:user });
			req.logIn(user,function(err){
				if (err) return res.send(err);
				return res.send({
					message:info.message,
					user:req.user
				})
			});
		})(req,res);
	},
	logout:function(req,res){
		req.logout();
		res.redirect('/');
	}
};

