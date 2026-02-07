// import jwt from 'jsonwebtoken';


// export const protect = async (req, res, next) => {
//     const token = req.headers.authorization || req.headers.Authorization;
//     if(!token){
//         return res.status(401).json({message: "No token provided, authorization denied"});
//     }
//     try{
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.userId = decoded.userId;
//         next();
//     }catch(error){
//        return res.status(401).json({message: "Invalid token, authorization denied"});
//     }
// }

// export default protect;

// import jwt from "jsonwebtoken";

// export const protect = (req, res, next) => {
//   // 1️⃣ Get authorization header (support both cases)
//   const authHeader = req.headers.authorization || req.headers.Authorization;

//   // 2️⃣ Check if header exists
//   if (!authHeader) {
//     return res.status(401).json({
//       message: "No token provided, authorization denied",
//     });
//   }

//   // 3️⃣ Check correct format: "Bearer <token>"
//   if (!authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({
//       message: "Token format invalid",
//     });
//   }

//   // 4️⃣ Extract ONLY the token (remove "Bearer ")
//   const token = authHeader.split(" ")[1];

//   try {
//     // 5️⃣ Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // 6️⃣ Attach userId to request
//     req.userId = decoded.userId;

//     // 7️⃣ Continue to controller
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       message: "Invalid token, authorization denied",
//     });
//   }
// };

// export default protect;

import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization || req.headers.Authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token, authorization denied" });
  }
};

export default protect;

