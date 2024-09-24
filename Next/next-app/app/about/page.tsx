import React from "react";
import Image from "next/image";

function page() {
  return (
    <div style={{ width: "100vw", height: 100 }}>
      About page
      <Image
        src="https://media.istockphoto.com/id/1500521004/photo/happy-man-with-backpack-jumping-on-top-of-the-mountain-delightful-hiker-with-arms-up-standing.webp?a=1&b=1&s=612x612&w=0&k=20&c=tRPwPmb_W5QcyE2Yz-PYuz2IklCoxCqNQtBsj7eyLSQ="
        width={400}
        height={240}
        alt="test"
        sizes="(max-width: 700px) 50vw: 90vw"
      />
      LOREM IPSUM CONTENT
    </div>
  );
}

export default page;
