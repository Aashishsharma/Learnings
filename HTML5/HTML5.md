## Index
1. **HTML5** - old(doctype req. reference to DTD), now (<'!DOCTYPE html'>), no type in script (<'script src/rel/href'>)
2. **New tags** - in body - (header, nav, article, section, aside, footer)
3. **New input types** - (datetime, number, email, url, required, placeholder)
4. **Canvas** - to draw graphics using JavaScript
5. **Audio/Video** - <'audio/video' src = ".mp3/4" width/height - 200px>
6. **Geolocation** - navigator.geolocation.getCurrentPosition(showLocation, errorHandler), showLocation( position ) {position.coords.latitude/longitude)
7. **Drag n drop APIs** 
8. **WebPush** - navigator.serviceWorker.register('/service-worker.js')

## HTML5
### New things
#### 1. OLD vs new Doc Type
Older HTML language was SGML based and therefore required a reference to a DTD.
```HTML
OLD
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
NEW
<!DOCTYPE html>
```
#### 2. No type required in script tag
```HTML
Old
<script type = "text/javascript" src = "scriptfile.js"></script> 
New
<script src = "scriptfile.js"></script>
Old
<link rel = "stylesheet" type = "text/css" href = "stylefile.css">
New
<link rel = "stylesheet" href = "stylefile.css">
```

#### 3. New Tags
```HTML
//New Markup
<!DOCTYPE html> 

<html>  
   <head> 
      <meta charset = "utf-8"> 
      <title>...</title> 
   </head> 
   <body> 
      <header>...</header>           // header of a section
      <nav>...</nav>                 // navigation
      <article>                      // independent piece of content of a document, such as a blog entry or newspaper article.
         <section>                   // application section 
            ... 
         </section> 
      </article>                      
      <aside>...</aside>             // only slightly related to the rest of the page.
      <footer>...</footer>           // footer of a section
   </body> 
</html> 
```

#### 4. New input type attributes
```HTML
<input type="datetime"></input>    // will take date only in a specified format 
<input type="number"></input>      // will take only number
<input type="email"></input>       // will take only valid email
<input type="url"></input>         // will take only valid url
// there are many more
autofocus, required, placeholder and so on
```

#### 5. Canvas
HTML5 element <canvas> gives you an easy and powerful way to draw graphics using JavaScript
```HTML
<!DOCTYPE HTML>
<html>
   <head>
      <style>
         #mycanvas{border:1px solid red;}
      </style>
   </head>
   <body>
      <canvas id = "mycanvas" width = "100" height = "100"></canvas>
   </body>
</html>
// This will draw a red box in the canvas area

//e.g. 
<!DOCTYPE HTML>
<html>
   <head>
      <style>
         #test {
            width: 100px;
            height:100px;
            margin: 0px auto;
         }
      </style>
      <script type = "text/javascript">
         function drawShape() {
            // get the canvas element using the DOM
            var canvas = document.getElementById('mycanvas');
            // Make sure we don't execute when canvas isn't supported
            if (canvas.getContext) {
               // use getContext to use the canvas for drawing
               var ctx = canvas.getContext('2d');
               // Filled triangle
               ctx.beginPath();
               ctx.moveTo(25,25);
               ctx.lineTo(105,25);
               ctx.lineTo(25,105);
               ctx.fill();
               // Stroked/empty triangle
               ctx.beginPath();
               ctx.moveTo(125,125);
               ctx.lineTo(125,45);
               ctx.lineTo(45,125);
               ctx.closePath();
               ctx.stroke();
            } else {
               alert('You need Safari or Firefox 1.5+ to see this demo.');
            }
         }
      </script>
   </head>
   <body id = "test" onload = "drawShape();">
      <canvas id = "mycanvas"></canvas>
   </body>
</html>
```
#### 6. Audio/Video
HTML5 features, include native audio and video support without the need for Flash  
```HTML
Video
<video src = "foo.mp4"  width = "300" height = "200" controls>
   Your browser does not support the <video> element.   
</video>
Audio
<audio src = "foo.wav" controls autoplay>
   Your browser does not support the <audio> element.   
</audio>
```
#### 7. Geolocation
It is an HTML 5 Api
```javascript
function getLocation() {
   var geolocation = navigator.geolocation;
   geolocation.getCurrentPosition(showLocation, errorHandler);
}
// Here showLocation and errorHandler are callback methods 
// which we need to implement
function showLocation( position ) {
   var latitude = position.coords.latitude;
   var longitude = position.coords.longitude;
   ...
}
```
HTML 5 also have drag n drop APIs