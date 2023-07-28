import express from "express"
import homeController from "../controllers/homeControllers.js";

const router = new express.Router();

router.get("/", homeController.getPage);

router.post("/", homeController.saveContact);


export default router;