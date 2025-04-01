import { Blog } from "../models";
import { formatPublishDate } from "../utils/misc";
import { IBlog, PaginatedData, Pagination } from "../types";

export async function getBlogs(
  forAdmin = false,
  pagination: Pagination = { page: 1, limit: 10 }
): Promise<PaginatedData<IBlog[]>> {
  const { page, limit } = pagination;
  const skip = (page - 1) * limit;

  const aggregateResult = await Blog.aggregate([
    { $match: forAdmin ? {} : { isDraft: false } },
    { $sort: { createdAt: 1 } },
    {
      $project: {
        title: 1,
        excerpt: 1,
        content: 1,
        ...(forAdmin ? { isDraft: 1 } : {}),
        publishedAt: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
    {
      $facet: {
        blogs: [{ $skip: skip }, { $limit: limit }],
        meta: [{ $count: "total" }],
      },
    },
  ]);

  const data: IBlog[] = (aggregateResult[0]?.blogs ?? []).map((b: any) => ({
    id: b._id,
    ...b,
    _id: undefined,
    publishDate: formatPublishDate(b.publishedAt),
  }));

  const total = aggregateResult[0]?.total ?? 0;

  return {
    data,
    page,
    limit,
    total,
  };
}

export async function getBlog(
  blogId: string,
  publishedOnly = true
): Promise<IBlog | null | undefined> {
  const blog = await Blog.findOne({
    $and: [{ _id: blogId }, ...(publishedOnly ? [{ isDraft: false }] : [])],
  }).exec();

  if (!blog) {
    return null;
  }

  return {
    id: blog.id,
    title: blog.title,
    excerpt: blog.excerpt,
    content: blog.content,
    isDraft: blog.isDraft,
    publishDate: formatPublishDate(blog.publishedAt),
    publishedAt: blog.publishedAt,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
  };
}

export async function updateBlog(
  blogId: string,
  data: Partial<IBlog>
): Promise<IBlog | null> {
  const blog = await Blog.findOneAndUpdate({ _id: blogId }, data).exec();

  if (!blog) {
    return null;
  }

  return {
    id: blog.id,
    title: blog.title,
    excerpt: blog.excerpt,
    content: blog.content,
    isDraft: blog.isDraft,
    publishDate: formatPublishDate(blog.publishedAt),
    publishedAt: blog.publishedAt,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
  };
}
