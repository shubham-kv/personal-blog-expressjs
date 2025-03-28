import { Router } from "express";
import { getAllBlogs } from "../services/blogs";

const blogsRouter = Router();

blogsRouter.get("/", (_, res) => {
  res.render("blogs", { blogs: getAllBlogs() });
});

export { blogsRouter };
