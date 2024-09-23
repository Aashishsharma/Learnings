/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
export function generateStaticParams() {
  return Array.from(Array(10).keys()).map((item) => ({ id: item.toString() }));
}
async function getPost(id: string) {
  console.log("making a fecth api call for id", id);
  const res = await fetch(`https://api.vercel.app/blog/${id}`);
  const post = await res.json();
  if (!post) notFound();
  return post;
}
export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
