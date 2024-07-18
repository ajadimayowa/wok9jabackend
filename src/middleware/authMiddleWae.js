const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    const jwtSecret = process.env.JWT_SECRET
    
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ 
            message: 'No token, authorization denied', 
            success: false 
        });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], jwtSecret);
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({ 
            message: 'Unauthorized', 
            success: false 
        });
    }
};

module.exports = authMiddleware;