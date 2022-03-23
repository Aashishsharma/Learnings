# Learnings


Prototypal inheritane -


Call apply bind
Function borrowing - borrow a method of 1 obj and use it in another obj
Every fun has call,apply,bind methods because of _proto_ 

E.g. 

Abstraction - hide details, show essentials


‐-------------- Debouncing and throttling-----------
Api rate limiting techniques
1. DEBOUNCE
Instead of calling api every single time, call only when there is a specific time gap between 2 api calls - used in input search autocomplete
If user is typing a keyword, keyup event is called every single time, but make api call when there is a pause (say 300ms) see on flipkart website, autosuggestion changes only when you wait fir skme time after yoy type your keyword.
Impl-
Doc.getElembyId.addEvntList('onkeyup', debounceCall) 

Let debounceCall = callApiWrapper(callSearchApi, 300) 

Func callApiwrapper(fn, time) {
let timer; //clusure helps in clearing timout of below retunred func
return function() {
  Let context = this;
  let arg = arguments;
  clearTimeout(timer)
   setTimeout(() => {
fn.apply(this,args)
}, time) 

}
  
Func callSearchApi() {
console.log(' calling search api')
} 

THROTTLING
Impl-
Doc.getElembyId.addEvntList('onResize', throttleCalk) 

Let throttleCall = callResizeApiWrapper(resuzeApi, 300) 

Func callResizeApiwrapper(fn, time) {
let flg = true; //clusure helps in using this val on each fncall 
return function() {
if(flg){
  Let context = this;
  let arg = arguments
fn.apply(this,args)
flg=false;
   setTimeout(() => {
flg=true // call next api only after certain interval of time
}, time)
} 

}
  
Func callSearchApi() {
console.log(' calling search api')
} 

THIS IN JS
1. IF func is a method, this belongs to obj
2. If func is func, then this belong to global window obj
3. Called with new - a new empty obj is created and returned
4. Arrow func, no this 

function video() {
  title='abc'
  tags=[1,2,3],
  showtags() {
    this.tags.firEach(function (tag) {
       console.log(context.title,tag) // o/p undefined 1,2,3 since cb func inside foreach is func invocation and this then belongs to window obj, to solve use arrow func, or let context=this imabive foreach and then context.title instead of this.title in foreach 

}
Hence never use arrow funcions in objects as methods -
let abc() {
  A=2
abc = () =>  {
  console.log(this.A) // ain't gonna work
}
}


React.lazy for code splitting - dynamic import
Fragment - usecase render multiple <td> but react como can return only one elem, so wrap in div, but then td can't be in div so fragment 

Hoc - normal comp - takes props and rerurns ui for that prop
Hoc - takes comp and props and return nes comp - almost always, hooks can replace hocs 

While using jsx, React must be in scope (i.e, import React from 'react'), why, because jsx transpiles down to React.createElement(<elem_nm>, <elem_props>, <html_child>)



Hoooooookkkssssss 

Group logically making sense of all states into one state object 

Usestate for arryay use spread operator to update array as state return [...oldarr, newItem]
Add at start [newItem, ...oldarr]
In between [...oldarr.slice(0,index), newItem, oldarr.slice(index)] 

Remove array elem
Use slice(1), slice(0, len-1),
[...oldarr.slice(0, index), ...oldarr.slice(index+1)


Useffect - to perform sideeffecct,
Func inside useeffect will run even if dom is manipulated, if second arg in useeffect func is not passed 

‐---‐----------------order of execution in func compoments------------- 

1. State initoalizations
2. Render method
3. Useeffect(()=》setinterval(setcnt(cnt+1), 1000) retutn clearinterval() , [])) every time new function is passed in usestate, [], if cnt is missing in [], then closure for cnt is created in setinterval, since the effect is run only once, setcnt doesn't get new staye val, since useeffect func isn't running on new render, if cnt is added in [], then clear interval called everytime, ideally shoild ne called once, 
Solve - use functional form of setstate --
Setcnt(cnt => cnt+1)


Custom hooks creation ‐‐-------------------
How is it different from normal functions?
