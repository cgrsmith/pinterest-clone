require("dotenv").load();
const jwt = require("jsonwebtoken");

//Is user logged in? Authentication
exports.loginRequired = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            return (decoded) ?  next() : next({
                status : 401,
                message : "Please log in first"
            });
        });
    } catch(err) {
        return next({
            status : 401,
            message : "Please log in first"
        });
    }
}

//Is the user the correct user? Authorization
exports.ensureCorrectUser = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if (decoded && decoded.id === req.params.id) {
                return next();
            } else {
                return next({
                    status : 401,
                    message : "Unauthorized"
                });
            }
        });
    } catch(err) {
        return next({
            status : 401,
            message : "Unauthorized"
        });
    }
}
