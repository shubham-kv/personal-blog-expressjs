import { Router } from "express";
import { getBlogs, getBlog } from "../services/blogs";
import { isMongoId } from "../utils/mongo";

const blogsRouter = Router();

blogsRouter.get("/", async (_, res) => {
  const blogsData = await getBlogs();
  res.render("blogs", { blogs: blogsData.data });
});

blogsRouter.get("/:id", async (req, res, next) => {
  const blogId = req.params.id;
  const blog = isMongoId(blogId) ? await getBlog(blogId) : undefined;

  if (blog) {
    res.render("blog-view", { blog });
    return;
  }

  next();
});

export { blogsRouter };
