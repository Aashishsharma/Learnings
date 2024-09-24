# Authentication + Optimization

## Authentication

If you have cover all Nextjs concepts, authentication is straight forward.

Authentication steps would be similar to authentication done in any apps (Express/ NestJS)

```javascript
// create server action
("use server");
import { cookies } from "next/headers";
export async function signup(state, formData) {
  // Validate form fields using Zod or any other library
  if (!validatedFields.success) {
    return {
      errors: "Input validation failed",
    };
  }
  // Call the provider or db to create a user...
  let user = await db.users.find({ username: formData.get("name") });
  if (!user) {
    return { error: "invalid user" };
  }
  // use jwt to create a token with secret key

  cookies().set("token", jwtToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

// create login form
import { signup } from "@/app/actions/auth";
export function SignupForm() {
  // we are going to use server actions

  return (
    <form action={signup}>
      <input id="name" name="name" placeholder="Name" />
      <input id="password" name="password" type="password" />
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

Now implement login middleware in API route handlers and fetch auth header and if token is valid, proceed with the request

### OAuth implementation using next-auth library

This library has integrations with many providers, we can alos use username passowrd login

**Step 1 - setup oauth config**

```javascript
// /api/auth/[...nextauth]/route.ts file
import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthOptions = {
  providers: [ // we can provide multiple providers here
    GithubProvider({ // github provider
      clientId: process.env.CLIENT_SECRET as string,
      clientSecret: process.env.CLIENT_SECRET as string,
    }),
    CredentialsProvider({ // credentials provider which will allow user to login using username and password
      name: "Credentials",
      credenetials: { // by specifing this, NEXTJS AUTOMATICALLY CREATED USERNAME AND PASSOWRD FIELD IN THE UI
      // but then how to create custom login pages? ans - add pages object (see below)
        username: {
          label: "username",
          type: "text",
          placeholder: "enter user name",
        },
        password: {
          label: "username",
          type: "password",
          placeholder: "enter ur password",
        },
      },
      async authorize(credenetials) {
        // retrieve data from DB and validate user credentials
        // hardcoding user for now
        const user = { id: 1, name: "ashish", password: "ashish" };
        if (
          credenetials?.username === user.name &&
          credenetials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/auth/signin', // nextjs will show this page on signin
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
...
};
const handler = NextAuth(options);
export { handler as GET, handler as POST };
```

**steo 2 - apply middleware to protest routes**

```javascript
// IMP - this should be at the root level inside app to protect all routes
// Without a defined matcher, this one line applies next-auth
// to the entire project
export { default } from "next-auth/middleware";

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ["/extra", "/dashboard"] };
```

1. After adding middleware if we go to url - localhost:300/api/auth/signin - we will see login form
2. This page is created by NexAuth, but we can create out own by overriding the pages object as shwon above
3. logout url - localhost:300/api/auth/signout

**step 3 - Use auth provider is client components**

```javascript
// create authcontext
"use client";
import { SessionProvider } from "next-auth/react";
export default function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

// in apps root layout page, wrap everything inside above created AuthProvider
<AuthProvider>
  <Navbar />
  <main className="flex justify-center items-start p-6 min-h-screen">
    {children}
  </main>
</AuthProvider>;

// in client componts use session hook
'use client'
// Remember you must use an AuthProvider for
// client components to useSession
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
export default function ClientPage() {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/client')
            // notice the callbackUrl=/client
            // once user successfully signs in,
            // user is redirected to the url he hit before authentication
        }
    })
    return (
        <section className="flex flex-col gap-6">
            <UserCard user={session?.user} pagetype={"Client"} />
        </section>
    )
}
```

## Optimizations

### 1. Image optimization

Without image component, we would use native HTML img tag, and by default the image is loaded on the webpage with whatever dimesions it has.  
If image dimensions are more than the viewport width or height, we will see horizontal scrollbar  
But in real work we will provide set the width property to the img tag to fit the image on a web page  
So image size would be 2500 \* 1200 (assume 2 MB imgae size), but we need the imgae to be displayed with width=400 (which would maybe 500kb).

The issue with native img tag is even if width is set to 400, the browser will download the entire big file (2MB) over the network and then fit it in 400px width  
**This is expensive**

**Also, when the image loads, the content will shift, maybe below based on where the imgae would load, this is called Content layout Shift (CLS)**

Image component in Nextjs provide varioud benifits

1. Avoids CLS issues

```javascript
import Image from "next/image";

<Image
  src="s3url or image from public folder of Next app"
  alt="Flying cats"
  width={400}
  height={300}
/>;
// when we set width and height props in Nextjs's Image component
// the browser will reserve that sapce in the vieweport, you have to manually set width and height to solve CLS issue
// with this width and height nextjs will compress the image and will not dwonlaod entire image with big size
```

2. Reducing image sizes

For local imges Nextjs automatically creates multiple version of images with different sizes  
`sizes="(max-width: 700px) 50vw: 90vw"`

For remote imgaes, we procide the srcset attribute and based on what device the page is loading, the browser will pick images from that remote src url, so for mobile apps, browser will pick lower dimension imgaes based on the sizes prop  
Note - we have to provide comma separated urls in srcset attribute along with image size

3. Using sharp npm package to compress images

```javascript
// compress-images.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
// get all imgaes from publick folder
const imagesFolder = path.join(__dirname, "public/images");

async function compressImages() {
  try {
    const files = fs.readdirSync(imagesFolder);
    for (const file of files) {
      const filePath = path.join(imagesFolder, file);
      //compress and store them to spearate folder, and use this folder to server your images
      const outputFilePath = path.join(imagesFolder, `compressed-${file}`);
      // Check if the file is an image (you can customize this)
      if (file.match(/\.(jpg|jpeg|png|gif)$/)) {
        await sharp(filePath)
          .resize({ width: 800 }) // Adjust the width as needed
          .jpeg({ quality: 80 }) // Set quality for JPEG, or use .png({ quality: 80 }) for PNG
          .toFile(outputFilePath);
        console.log(`Compressed: ${file} -> ${outputFilePath}`);

        //here optionally delete the files from images folder and add compressed files to other folder
        // this way next time script runs, older files are not compressed again
      }
    }
    console.log("Image compression completed!");
  } catch (error) {
    console.error("Error compressing images:", error);
  }
}
compressImages();

// now in packagenjson
// "compress-images": "node compress-images.js"
// and change the build command to
// "build": "npm run compress-images &&next build",
```
