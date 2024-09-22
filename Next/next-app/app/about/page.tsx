import Link from "next/link";
//import { notFound } from "next/navigation";
import React from "react";

async function page() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await res.json();
  //notFound();
  throw new Error("Something went worng");
  return (
    <div>
      {data.title}
      <Link href={"/about/as"}>as</Link>
    </div>
  );
}

export default page;
