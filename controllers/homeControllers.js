import Contact from "../models/contact.js";

const homeController  = {
    getPage : async(req, res) => {
        res.render("index");
    },
    saveContact : async(req, res) => {
        const {name, email, phone, message} = req.body;
        if (name && email && phone && message){
            try{
                const contact = new Contact({
                    name : name,
                    email : email,
                    phone : phone,
                    message : message
                });
                await contact.save();
                res.render("message", {
                    messageTitle : "Thanks",
                    message : "Thanks for connecting with us ;)",
                    link : "/"
                });
            }catch(err){
                res.send("something went wrong figuring out what happened")
            }
            
            
        }else{
            res.render("message", {
                messageTitle : "Error",
                message : "All fields are required",
                link : "/"
            })
        }
    }
}

export default homeController;