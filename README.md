# Learnings



React.lazy for code splitting - dynamic import




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
