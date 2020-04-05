const jwt = require("jsonwebtoken");
const config = require("./../config/default.json");


module.exports = function (req, res, next) {
    //get the token from header
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: "No token ,authorization denied" });
    }
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded.user;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({ mag: "Token not valid" });
    }
}