import { format } from "date-fns";
import { IBlog } from "../types";

export function getAllBlogs(): IBlog[] {
  return [
    {
      id: "1",
      title: "First Blog",
      excerpt: "Hello World",
      content: "This is the first hello world blog",
      publishDate: format(new Date(), "hh:mm aaa, Lo LLLL yyyy"),
    },
    {
      id: "2",
      title: "Second Blog",
      excerpt: "Hello World",
      content: "This is the first hello world blog",
      publishDate: format(new Date(), "hh:mm aaa, Lo LLLL yyyy"),
    },
  ];
}
