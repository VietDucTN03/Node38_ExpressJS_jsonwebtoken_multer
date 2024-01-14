import jwt from "jsonwebtoken";
/*
    param 1: truyền payload (data mà mình muốn đưa vào token) -> JSON
    param 2: secret key: khóa để tạo token, muốn giải mã thì phải có secret key
    param 3: thời gian sử dụng token 
*/

const createToken = (data) => {
  return jwt.sign(data, "NODE38", { expiresIn: "5y" });
};

const checkToken = (token) => {
   return jwt.verify(token, "NODE38", (err, decoded) => {
      if(err) {  // Nếu giải mã thất bại -> sẽ có error message
         return {
            statusCode: 401,  // 401 - unauthorized
            message: "Invalid token" 
         }
      } 
      return {
         statusCode: 200,
         data: decoded
      }
   });
}

const khoaAPI = (req, res, next) => {
   // nếu thóa yêu cầu của middleware thì bypass
   let {token} = req.headers;
   // kiểm tra có token trên header
   if (token) {
       let verifyToken = checkToken(token);
       if(verifyToken.statusCode == 401) {
           res.status(401).send("Invalid token")
           return
       }
       // nếu muốn check role -> handle logic ở đây

       next(); // bypass
   } else {
       res.status(401).send("Unauthorrized");
       return
   }
}

export { createToken, checkToken, khoaAPI };
