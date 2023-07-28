import express from "express";
import adminController from "../controllers/adminController.js"
import auth from "../middleware/auth.js";

const router = new express.Router();

router.get("/login", adminController.renderAdminLogin);
router.post("/login", adminController.adminLogin);
router.get("/dashboard", auth, adminController.renderAdminDashboard);
router.delete("/dashboard/:id", auth, adminController.adminDelete);
router.get("/add", auth, adminController.renderAdminAdd);
router.post("/add", auth, adminController.adminAdd)
router.get("/data", auth, adminController.getData);

export default router;