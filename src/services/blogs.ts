import { format } from "date-fns";
import { IBlog } from "../types";

const allBlogs: IBlog[] = [
  {
    id: "1",
    title: "First Blog",
    excerpt: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
quae blanditiis vel! Repellendus autem, quaerat blanditiis ut rerum
nisi, voluptatibus at maxime ducimus quae odio ea laudantium temporibus.
Esse, molestias`,
    content: `
<p class="my-2">
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
  quae blanditiis vel! Repellendus autem, quaerat blanditiis ut rerum
  nisi, voluptatibus at maxime ducimus quae odio ea laudantium temporibus.
  Esse, molestias.
</p>
<p class="my-2">
  Est harum odio ipsam vitae soluta esse eius tempora sed adipisci
  voluptatibus eveniet, unde, eaque, sapiente doloremque ea culpa
  voluptas. Quae, harum.
</p>
<p class="my-2">
  Enim voluptatum blanditiis eveniet! Dolores soluta delectus quas eius sint ullam
  totam minima ducimus omnis reprehenderit culpa iusto, at cum ad nemo?
</p>
    `,
    publishDate: format(new Date(), "hh:mm aaa, Lo LLLL yyyy"),
  },
  {
    id: "2",
    title: "Second Blog",
    excerpt:
`Est harum odio ipsam vitae soluta esse eius tempora sed adipisci
voluptatibus eveniet, unde, eaque, sapiente doloremque ea culpa
voluptas. Quae, harum.
`,
    content: "This is the first hello world blog",
    publishDate: format(new Date(), "hh:mm aaa, Lo LLLL yyyy"),
  },
];

export function getAllBlogs(): IBlog[] {
  return allBlogs;
}

export function getBlog(id: string): IBlog | undefined {
  return allBlogs.find((b) => b.id === id);
}
