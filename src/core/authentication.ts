// import jwt from 'jsonwebtoken';
// require("dotenv").config()
// export const authenticationMiddleware = (req, res, next) => {

//     let token = req.headers["authorization"];
//     if (token) {
//         try {
//             // token = token.split(' ')[1];
//             console.log(token)

//             const decoded = jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
//                 if (err) {
//                     res.status(401).send({
//                         msg: 'Authorization token is not valid'
//                     });
//                 } else {
//                     console.log(decoded, "decoded token")
//                     req.user = decoded;
//                     next();
//                 }
//             });
//         } catch (e) {
//             return res.status(401).send({
//                 msg: 'Authorization token is not valid'
//             });
//         }
//     } else {
//         console.log("No token");
//         return res.status(401).send({
//             msg: 'Authorization token missing in request.'
//         });
//     }

// };