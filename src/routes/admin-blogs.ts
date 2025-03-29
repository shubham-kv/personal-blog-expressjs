import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { hasAdminPerms } from "../middlewares";
import { getAllBlogs } from "../services/blogs";

const adminBlogsRouter = Router();

adminBlogsRouter.use(requireAuth({ signInUrl: "/sign-in" }), hasAdminPerms);

adminBlogsRouter.get("/", (_, res) => {
  res.locals.layout = "admin-main";
  res.render("admin-blog-list", { blogs: getAllBlogs() });
});

export { adminBlogsRouter };
