# Core Web vitals

A set of specific metrics defined by Google to measure key aspects of user experience on a webpage.  
3 key areas

1. Largest Contentful Painy (LCP)
2. First Input Delay (FID)
3. Cummulative Layout Shift (CLS)

These performances can be measured in chrome devtools -> lighthouse.

Earlier these 3 metrics were just guidelines that google published to imporve site performance, but now Goolge has mentioned that these scores will impact SEO ranking, so these are imp

## 1. LCP (< 2.5s)

- how long it takes for the **largest visible content in the viewport** (like images or text) on a page to load

### Improving LCP score

## 2. FID (< 100ms)

- how long it takes for the site to respond on **first user action** (like button click or inputting value in elem)

### Improving FID score

## 3. CLS (< 0.1)

- how much content shifts unexpectedly on the screen as the page loads
- **CLS = (Impact fraction \* Distance Fraction)**
- Impact fraction - what % of the view port is getting shifted? e.g. last 10 lines within the viewport gets shifted when the imgae is loaded in the middle (consider as 10%)
- Distance Fraction - the % distance the imapcted elements are shifted, e.g. ptags shifted 100px below out of 1200px viewport size

### Improving CLS score
