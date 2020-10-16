## HTML5
### New things
#### 1. OLD vs new Doc Type
Older HTML language was SGML based and therefore required a reference to a DTD.
OLD
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
NEW
<!DOCTYPE html>

#### 2. No type required in script tag
Old
<script type = "text/javascript" src = "scriptfile.js"></script> 
New
<script src = "scriptfile.js"></script>
Old
<link rel = "stylesheet" type = "text/css" href = "stylefile.css">
New
<link rel = "stylesheet" href = "stylefile.css">


#### 3. New Tags

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


#### 4. New input type attributes
<input type="datetime"></input>
