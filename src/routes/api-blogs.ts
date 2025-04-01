import { Router } from "express";
import { requireAuth } from "@clerk/express";

import { hasAdminPerms } from "../middlewares";
import { createBlog, updateBlog } from "../services/blogs";
import { isMongoId } from "../utils/mongo";
import { IBlog } from "../types";

const apiBlogsRouter = Router();

apiBlogsRouter.use(requireAuth({ signInUrl: "/sign-in" }), hasAdminPerms);

apiBlogsRouter.post("/create", async (req, res, next) => {
  const { title, content } = req.body as Partial<IBlog>;

  const blogData: Partial<IBlog> = {
    ...(title ? { title } : {}),
    ...(content ? { content } : {}),
  };

  if (!(Object.keys(blogData).length > 0)) {
    res.status(400).json({ error: "Empty request body" });
    return;
  }

  const createdBlog = await createBlog(
    blogData as Pick<IBlog, "title" | "content">
  );

  if (createdBlog) {
    res.json({ message: "Add Success", blog: createdBlog });
    return;
  }

  next();
});

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

apiBlogsRouter.post("/:id/publish", async (req, res, next) => {
  const blogId = req.params.id;
  const patchData: Partial<IBlog> = {
    isDraft: false,
    publishedAt: new Date()
  };

  if (isMongoId(blogId)) {
    const publishedBlog = await updateBlog(blogId, patchData);

    if (publishedBlog) {
      res.json({ message: "Publish Success", blog: publishedBlog });
      return;
    }
  }

  next();
});

export { apiBlogsRouter };
