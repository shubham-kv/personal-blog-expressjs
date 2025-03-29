import "dotenv/config";

import path from "path";
import morgan from "morgan";
import express from "express";
import { engine } from "express-handlebars";
import { clerkMiddleware } from "@clerk/express";

import { adminBlogsRouter, blogsRouter } from "./routes";
import { logger } from "./logger";

const app = express();
const morganStream: morgan.StreamOptions = {
  write(str) {
    logger.info(str.trim());
  },
};

app.disable("x-powered-by");

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../views"));

app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "../public")));
app.use(morgan("dev", { stream: morganStream }));

app.get("/", (_, res) => {
  res.redirect("/blogs");
});

app.use("/blogs", blogsRouter);
app.use("/admin/blogs", adminBlogsRouter);

app.use("/sign-in", (_, res) => {
  res.render("sign-in");
});

export default app;
