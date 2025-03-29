import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { hasAdminPerms } from "../middlewares";
import { getAllBlogs } from "../services/blogs";

const adminBlogsRouter = Router();

adminBlogsRouter.use(requireAuth({ signInUrl: "/sign-in" }), hasAdminPerms);

adminBlogsRouter.get("/", (_, res) => {
  res.render("blogs", { blogs: getAllBlogs() });
});

export { adminBlogsRouter };
