var jwt = require("jwt-simple");
var secret = "xxx";
module.exports = async (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).json({
            message: 'Authorization header is needed for this request'
        });
    }
    try {

    console.log("inside catch", req.headers.authorization);

       await jwt.decode(req.headers.authorization, secret)
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Authentication failed'
        });
    }
};