# Core Web vitals

A set of specific metrics defined by Google to measure key aspects of user experience on a webpage.  
3 key areas

1. Largest Contentful Painy (LCP)
2. First Input Delay (FID), now replaced by INP (Interaction to Next Paint)
3. Cummulative Layout Shift (CLS)

These performances can be measured in chrome devtools -> lighthouse. or goto - [PageSpeed Insight ](https://pagespeed.web.dev/)
The scores for your website would be different for mobile and desktop devices.

**Note the score you see in lighthouse is Lab Data** - because this score doesnot simulate actual user's experience.  
For this google uses **Field data** - data generated when actual users visit your page.  
You can use goolge analytics to see which devices real users are using and then test the web vital score on those devices

Earlier these 3 metrics were just guidelines that google published to imporve site performance, but now Goolge has mentioned that these scores will impact SEO ranking, so these are imp

## 1. LCP (< 2.5s)

- how long it takes for the **largest visible content in the viewport** (like images or text) on a page to load
- LCP only masures time for largest elem (like image or text) which is **above the fold**, meaning the content that is seen on the screen without user scroll

### Improving LCP score

1. Optimize images **(most impactful)**

Images have largest size as compared to any other resource that needs to be downloaded.  
Let's say you have high resolution img, `<img>` tag will download the file, and even if you set width=800 in html, browser will still download the high resolution img from it's source, but this is not needed, width is set to 200px.
We can have same imgae with multiple sizes, and instruct the browser to download smaller image if width is 200px. See below code on how this is done

```HTML
<img src="small.jpg"
     srcset="small.jpg 300w, // instead of local file, we can provide remote image url
             medium.jpg 600w,
             large.jpg 1200w"
     sizes="(max-width: 600px) 300px, // if screen size is lesst than 600, download small.jpg
            (max-width: 900px) 600px, // screen size less that 900, download medim.jpg
            1200px          // else download large.jpd"
     alt="A description of the image">
```

1.a. - use optimized image formats liek WebP (see below on WebP formats)

2. Minify CSS / JS files
3. Use defer attribute for script tags `<script defer src="abc.js />"`, this will ensure JS is downloaded parallely without blocking the browser tp parse HTML, and js will be executed only after full hTML is loaded and parsed

4. use `font-style: swap` in css, this ensures text is visible while the font is loading

We can use normal font-familly

```css
@font-face {
  font-family: "FontName";
  src: url("path-to-font-file.woff2") format("woff2"), url("path-to-font-file.woff")
      format("woff"); /*download necessary fonts*/
  font-weight: normal;
  font-display: swap; /* Ensures text is visible while the font is loading */
}
```

5. use CDN

## 2. FID (< 100ms) / INP (< 200ms>)

- how long it takes for the site to respond on **first user action** (like button click or inputting value in elem)

### Improving FID score

In the lab data (lighthouse or page speed insight), we cannot get FID score, because to measure FOD score user action is required.  
So we need to measure **(Total Blocking Time) TBT score** in lab tools like lighthouse, **less TBT = less FID**

1. Reduce JS execution time

- minify js
- use web workers to minimize main thread work

2. Minimize 3rd part Js code on client

- in Nextjs use server components while using 3rd party libraries

![alt text](PNG/Capture15.PNG "Title")  
Here Page speed insights show you which part is taking time and based on time takes, fix those issues.

**From March 2024, google would be replacing FID with INP (Interaction to Next Paint)**

## 2. INP similar to FID

- time after which the site becomes interactive
- it will take the largest time (if button resopons to action in 100ms, and hamburger icon opens after 400ms), then INP = 400ms
- improving INP - same stpes to take which improves FID
- use throttling in scroll events

## 3. CLS (< 0.1)

- how much content shifts unexpectedly on the screen as the page loads
- **CLS = (Impact fraction \* Distance Fraction)**
- Impact fraction - what % of the view port is getting shifted? e.g. last 10 lines within the viewport gets shifted when the imgae is loaded in the middle (consider as 10%)
- Distance Fraction - the % distance the imapcted elements are shifted, e.g. ptags shifted 100px below out of 1200px viewport size

### Improving CLS score

1. Always use width or height property for images, if you use width, browser will automatocally decide height based on image's aspect ratio
1. Optimize images

- use formats like WEBP (see below for WebP formats)
- set width of images, leave height, browser will calculate height based on original image's aspect ratio

2. Host your own fonts - if browser's system font is way different than your custom font, CLS can occur

- if you use 3rd party fonts, there would be lot of external network calls
- instead download the font and serve it from your server

#### WebP formats

- image format developed by Google
- compress images to great extent to reduce image sizes without compromizing image quality
- WebP images can be 25-34% smaller than JPEG or PNG images while maintaining similar quality

**COnverting imgaes to WebP format**

- first compress jpg/png images to redice size
- on the compressed images, convert them to WebP using online tools like - CloudConvert
- use bash command `cwebp image.png -o image.webp`
