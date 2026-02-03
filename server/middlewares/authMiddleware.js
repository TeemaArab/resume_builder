import jwt from 'jsonwebtoken';


export const protect = async (req, res, next) => {
    const token = req.headers.authorization
    if(!token){
        return res.status(401).json({message: "No token provided, authorization denied"});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }catch(error){
       return res.status(401).json({message: "Invalid token, authorization denied"});
    }
}

export default protect;