var jwt = require("jwt-simple");
var secret = "xxx";
module.exports = (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userInfo = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Authentication failed'
        });
    }
};