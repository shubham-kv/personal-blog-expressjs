import { Router } from "express";
import { getAllBlogs, getBlog } from "../services/blogs";

const blogsRouter = Router();

blogsRouter.get("/", (_, res) => {
  res.render("blogs", { blogs: getAllBlogs() });
});

blogsRouter.get("/:id", (req, res, next) => {
  const blog = getBlog(req.params.id);

  if (!blog) {
    next();
  } else {
    res.render("blog", { blog });
  }
});

export { blogsRouter };
