import "dotenv/config";
import path from "path";
import express from "express";
import { engine } from "express-handlebars";
import { getAllBlogs } from "./services/blogs";

const app = express();

app.disable("x-powered-by");

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../views"));

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (_, res) => {
  res.redirect("/home");
});

app.get("/home", (_, res) => {
  res.render("home", { blogs: getAllBlogs() });
});

export default app;
