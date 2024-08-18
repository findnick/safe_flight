import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export default async function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({
            msg: 'Autorization denied, token missing',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        req.tok = token
        req.user = decoded.user;
        console.log("---The User is----");
        console.log(req.user);
        const { id } = req.user
        try {
            const user = await User.findOne({ _id: id });
            if (user?.role == 1) {
                return next();
            }
            console.log(user);
            return res.status(401).json({ msg: 'Authorization denied, role doesnot match for requested resource' });
        } catch (error) {
            console.log(err.message);
            res.status(401).json(error)
        }
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ msg: 'Invalid token' });
    }
};