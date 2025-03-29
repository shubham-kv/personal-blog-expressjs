import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { hasAdminPerms } from "../middlewares";
import { getAllBlogs, getBlog } from "../services/blogs";

const adminBlogsRouter = Router();

adminBlogsRouter.use(requireAuth({ signInUrl: "/sign-in" }), hasAdminPerms);

adminBlogsRouter.get("/", (_, res) => {
  res.locals.layout = "admin-main";
  res.render("admin-blog-list", { blogs: getAllBlogs() });
});

adminBlogsRouter.get("/:id", (req, res, next) => {
  const blog = getBlog(req.params.id);

  if (blog) {
    res.locals.layout = "admin-main";
    res.render("admin-blog-view", { blog });
    return;
  }

  next();
});

export { adminBlogsRouter };
