import express  from "express";
import path from "path"
import { fileURLToPath } from "url";
import hbs from "hbs";
import "./config/dbConn.js";
import homeRouter from "./routes/homeRoute.js"
import adminRouter from "./routes/adminRoute.js"
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import { config } from "dotenv";
config();

const app = express();
const __filename  = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(methodOverride("_method"));
app.use(express.static(publicPath));
app.use(cookieParser());
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);


app.use("/", homeRouter);
app.use("/admin", adminRouter);


app.listen(process.env.PORT, () => {
    console.log(`server started listening to request on port ${process.env.PORT}`);
})
