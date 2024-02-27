const Admin  = require("../models/Admin");

// Middleware for handling auth
function adminMiddleware(req, res, next) {

    const { username, password } = req.body;// truecolors  truecolors2024
    // console.log(username, password);

    Admin.findOne({
        username: username,
        password: password
    })
    .then(function(value) {
        if (value) {
            next();
        } else {
            res.status(403).json({
                msg:  "loginStatus: false"
            })
        }
    })
}

module.exports = adminMiddleware;