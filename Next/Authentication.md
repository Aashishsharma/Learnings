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
// the browser will reserve that sapce in the vieweport
// and the content below image will be renderd keeping space for the image
// acoiding CLS issue
// note width and height won't determine the actual width and height
```

2. Reducing image sizes

For local imges Nextjs automatically creates multiple version of images with different sizes  
`sizes="(max-width: 700px) 50vw: 90vw"`

For remote imgaes, we procide the srcset attribute and based on what device the page is loading, the browser will pick images from that remote src url, so for mobile apps, browser will pick lower dimension imgaes based on the sizes prop  
Note - we have to provide comma separated urls in srcset attribute along with image size
