import Contact from "../models/contact.js";
import Admin from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminController = {

    renderAdminLogin : async(req, res) => {
        res.render("adminLogin");
    },

    adminLogin : async(req, res) => {
        const {email, password} = req.body;
        const admin = await Admin.findOne({email : email});
        if (admin){
            const isPassSame = await bcrypt.compare(password, admin.password)
            if (isPassSame){
                const token = jwt.sign({userId : admin.id}, process.env.SECRET_KEY);
                res.cookie("token", token, {expires : new Date(Date.now() + 86400000), httpOnly : true});
                res.redirect("/admin/dashboard");
            }else{
                res.render("message", {
                    messageTitle : "Invalid",
                    message : "Invalid credentials",
                    link : "/admin/login"
                });
            }
        }else{
            res.render("message", {
                messageTitle : "Invalid",
                message : "Invalid credentials",
                link : "/admin/login"
            });
        }
    },

    renderAdminDashboard : async(req, res) => {
        const admins = await Admin.find();
        res.render("adminDashboard", {admins, adminEmail : req.user.email });
    },

    adminDelete : async(req, res) => {
        const {id} = req.params;
        const authAdmin = req.user;
        const admin = await Admin.findOne({_id : id});
        const admins = await Admin.find();
        if (admins.length > 1){
            if (admin.email === authAdmin.email){
                const admin = await Admin.findByIdAndDelete(id);
                res.clearCookie("token")
                res.redirect("/admin/login")
            }else{
                const admin = await Admin.findByIdAndDelete(id);
                res.redirect("/admin/dashboard");
            }
        }else{
            res.render("message", {
                messageTitle : "Error",
                message : "Should have alteast one Admin",
                link : "/admin/dashboard"
            })
        }
    },

    renderAdminAdd : async(req, res) => {
        res.render("adminAdd");
    },

    adminAdd : async(req, res) => {
        const {email, password} = req.body;
        if (email && password){
            const admin = await Admin.findOne({email : email});
            if (admin){
                res.render("message", {
                    messageTitle : "Already",
                    message : "Email Id already exists",
                    link : "/admin/add"
                })
            }else{
                const admin = new Admin({
                    email : email,
                    password : await bcrypt.hash(password , 10)
                });
                await admin.save();
                res.redirect("/admin/dashboard")
            }
        }else{
            res.render("message", {
                messageTitle : "Required",
                message : "All fields are required",
                link : "/admin/add"
            })
        }
    },

    getData : async(req, res) => {
        const data = await Contact.find();
        res.send(data);
    }

}

export default adminController;