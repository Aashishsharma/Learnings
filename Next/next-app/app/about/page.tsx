import { unstable_cache } from "next/cache";

export const revalidate = 10;

const getPosts = unstable_cache(
  async () => {
    return await new Promise<string>((resolve) => {
      console.log("fetching data again");
      setTimeout(() => resolve(new Date().toDateString()), 3000);
    });
  },
  ["posts"],
  { revalidate: 15, tags: ["posts"] }
);

export default async function Page() {
  const allPosts = await getPosts();
  console.log({ allPosts });

  return <ul>{allPosts}</ul>;
}
