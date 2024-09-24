import React from "react";
import Image from "next/image";
import myImage from "../customImage.jpeg";

function page() {
  return (
    <div style={{ width: "100vw", height: 100 }}>
      About page
      <Image
        src={myImage}
        // width={400}
        // height={40}
        alt="test"
        sizes="(max-width: 700px) 50vw: 90vw"
      />
    </div>
  );
}

export default page;
