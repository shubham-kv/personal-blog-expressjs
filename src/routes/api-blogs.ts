import { Router } from "express";
import { requireAuth } from "@clerk/express";

import { hasAdminPerms } from "../middlewares";
import { updateBlog } from "../services/blogs";
import { isMongoId } from "../utils/mongo";
import { IBlog } from "../types";

const apiBlogsRouter = Router();

apiBlogsRouter.use(requireAuth({ signInUrl: "/sign-in" }), hasAdminPerms);

apiBlogsRouter.post("/:id/edit", async (req, res, next) => {
  const blogId = req.params.id;
  const { title, content } = req.body as Partial<IBlog>;

  const patchData: Partial<IBlog> = {
    ...(title ? { title } : {}),
    ...(content ? { content } : {}),
  };

  if (isMongoId(blogId)) {
    if (!(Object.keys(patchData).length > 0)) {
      res.status(400).json({ error: "Empty request body" });
      return;
    }

    const updatedBlog = await updateBlog(blogId, patchData);

    if (updatedBlog) {
      res.json({ message: "Edit Success", blog: updatedBlog });
      return;
    }
  }

  next();
});

export { apiBlogsRouter };
