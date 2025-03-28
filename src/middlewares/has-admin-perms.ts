import { RequestHandler } from "express";
import { clerkClient, getAuth } from "@clerk/express";

export const hasAdminPerms: RequestHandler = async (req, res, next) => {
  const auth = getAuth(req);
  const user = await clerkClient.users.getUser(auth.userId!);

  if ("perms" in user.privateMetadata) {
    const perms = user.privateMetadata.perms as string[];

    if (perms.includes(process.env.PERM_MANAGE_BLOGS)) {
      return next();
    }
  }

  return res.redirect("/");
};
