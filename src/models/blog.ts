import { model, Schema } from "mongoose";
import { IBlog } from "../types";

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    excerpt: String,
    content: {
      type: String,
      required: true,
    },
    isDraft: {
      type: Boolean,
      default: true,
    },
    publishedAt: Date
  },
  {
    timestamps: true,
  }
);

export const Blog = model<IBlog>("Blog", blogSchema);
