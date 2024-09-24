const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const authenticateJWT = (req, res, next) => {
    // Get the token from the cookies
    const token = req.cookies.authToken; // Extract the token from the 'authToken' cookie

    if (!token) {
        return res.status(401).json({ message: 'Access denied, token missing' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded; // Attach the user info to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticateJWT;
