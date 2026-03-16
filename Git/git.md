# GIT - version controlling system (VCS)
- distributed VCS

## Git objects 
- building blocks of Git’s storage model
- 3 git objects
- each object is identified by it's hash aka SHA1

#### 1. Blob - (Binary large object)
- stores content of file

#### 2. Tree
- similar to directory
- stores reference of blob and other trees

#### 3. Commits
- snapshot of the repository at a point in time.
- Contains - 
1. pointer to a tree
2. pointer to parent commit(s)
3. committer
4. commit message
5. timestamp

![alt text](PNG/Git1.PNG "Title")  

**What happens when we change content of few files in the subsequent commits?**  
- A new blob is created for each changed file
- The commit object points to new blobs / trees, where as the commit obj, references to same blobs / trees which are unchanged
- thus, each commit refers to entire snaphot of the repo at a given time

- look below, when a new commit is created when contents of Hello world, changes, but other files remain same, (follow SHA1s with red color)
![alt text](PNG/Git2.PNG "Title")  

## Branch
- it is just a named reference to a commit
- how does git know which branch we are on?
- git uses a special pointer - **HEAD** - to know on which branch / commit we are currently on
- generally **HEAD** points to a branch, but if it points to a specific commit, then we call it as **detached head**
- ```git branch test``` - if we run this command (let's say from main branch), new branch with name test is created, which points to the latest commit of main branch, so both test and main branches point to the same commit, but HEAD is still pointing to main brach
- ```git checkout test``` - now head will point to test branch. so basically this command just moves head
- ```git checkout -b test``` - it is combination of (above 2 commands), created a new brnach test and also points HEAD to test

**SUMMARY - branch is just named reference to a commit, and HEAD is a pointer to a specific branch or commit**

## .git folder structure
![alt text](PNG/Git3.PNG "Title")  

#### 1. objects - this folder contains all the objs (blob, tree and commits)
- notice how the object's folder is nested like (12 -> AFD389...) - this is for fater searching, the outer folder - 12 is the first 2 digits of SHA1, and the inner folder - is the remaining digits of SHA1 - this makes git faster to search a particualt SHA1

#### 2 - HEAD
- this is just a file - which has contents like - ref: refs/heads/master - tells git where the HEAD is pointed to

#### 3 - refs
- this is a folder, containing files for each brnach - so if we have 2 branches - main and test
- the refs folder will have 2 files main and test, and the contents of each file will be the commit to which a particular branch points to

#### 4 Index
- this is a file which stores metadata of all the files which are to be staged to the next commit
- so it is a snapshot of the current staging area
