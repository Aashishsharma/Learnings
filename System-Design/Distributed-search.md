# Distributed Search

e.g. - Youtube / google search

![alt text](PNG/ds1.PNG "Title")  

## Distributed Search system design

### 1. Requirements

**Functional requirements**

1. Users should be able to search

**Non Functional requirements** - 

1. Availablity
2. Scalibility
3. Performance

### 2. Building block needed

1. Blob store to store the data that needs to be indexed

## Step 1 - Build Indexing

#### Search using Inverted indexing 

1. For each document we assign ID, so that we can refer those Ids when creating inverted index

![alt text](PNG/ds2.PNG "Title") 

2. Create Inverted Index  

![alt text](PNG/ds3.PNG "Title") 
