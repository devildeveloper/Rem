module.exports = function(req, res, next) {
   if (req.user.role === 'admin') {
        return next();
    }
    else{
        return res.send('no admin')
    }
};