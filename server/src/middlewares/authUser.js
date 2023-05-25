const jwt = require('jsonwebtoken');

const authUser = (req, res, next) => {
    const token = req.headers['x-auth-token'];

    if(!token){
        return res.status(404).json({ msg: "Invalid token."});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userJwt = decoded;

        next();

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = authUser;