//import Image from "next/image";

import Link from "next/link";

export const metadata = {
  title: {
    absolute: "123",
    default: "main", // Sets the default title
    template: "%s a", // Defines a template for pages that override the default
  },
};

export default function Home() {
  console.log("executing");
  return (
    <div>
      next JS
      <Link href={"/about"}>About us</Link>
    </div>
  );
}
