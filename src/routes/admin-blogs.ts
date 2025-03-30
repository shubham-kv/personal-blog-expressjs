import { Router } from "express";
import { requireAuth } from "@clerk/express";

import { hasAdminPerms } from "../middlewares";
import { getBlogs, getBlog } from "../services/blogs";
import { isMongoId } from "../utils/mongo";

const adminBlogsRouter = Router();

adminBlogsRouter.use(requireAuth({ signInUrl: "/sign-in" }), hasAdminPerms);

adminBlogsRouter.get("/", async (_, res) => {
  const blogsData = await getBlogs(true);
  res.locals.layout = "admin-main";
  res.render("admin-blog-list", { blogs: blogsData.data });
});

adminBlogsRouter.get("/:id", async (req, res, next) => {
  const blogId = req.params.id;
  const blog = isMongoId(blogId) ? await getBlog(blogId, false) : undefined;

  if (blog) {
    res.locals.layout = "admin-main";
    res.render("admin-blog-view", { blog });
    return;
  }

  next();
});

export { adminBlogsRouter };
