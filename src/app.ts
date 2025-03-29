import "dotenv/config";
import path from "path";
import express from "express";
import { engine } from "express-handlebars";
import { clerkMiddleware } from "@clerk/express";

import { adminBlogsRouter, blogsRouter } from "./routes";

const app = express();

app.disable("x-powered-by");

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../views"));

app.use(clerkMiddleware());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (_, res) => {
  res.redirect("/blogs");
});

app.use("/blogs", blogsRouter);
app.use("/admin", adminBlogsRouter);

app.use("/sign-in", (_, res) => {
  res.render("sign-in");
});

export default app;
