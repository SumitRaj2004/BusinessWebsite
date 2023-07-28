import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

const auth = async(req, res, next) => {
    const {token} = req.cookies;
    if (token){
        try{
            const payload = jwt.verify(token, process.env.SECRET_KEY);
            const admin = await Admin.findOne({_id : payload.userId}).select("-password");
            if (admin){
                req.user = admin;
                next();
            }else{
                res.render("message", {
                    messageTitle : "Not Authorized",
                    message : "Your are not authorized to access this page",
                    link : "/"
                });
            }
        }catch(err){
            res.render("message", {
                messageTitle : "Not Authorized",
                message : "Your are not authorized to access this page",
                link : "/"
            });
        }
    }else{
        res.render("message", {
            messageTitle : "Not Authorized",
            message : "Your are not authorized to access this page",
            link : "/"
        });
    }
}


export default auth;