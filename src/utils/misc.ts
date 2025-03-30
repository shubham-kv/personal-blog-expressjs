import { formatDate } from "date-fns";

export const formatPublishDate = (
  publishDate: Date | string
): string | undefined =>
  publishDate
    ? formatDate(new Date(publishDate), "hh:mm aaa, Lo LLLL yyyy")
    : undefined;
