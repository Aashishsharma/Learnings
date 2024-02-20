# Blob store

To store (unstructured data) photos, audio, videos, binary executable codes, or other multimedia items.  

Blob store is mostly used by applications with a particular business requirement called write once, read many (WORM).  


| System            | Blob Store         |
|-------------------|--------------------|
| Netflix           | S3                   |
| YouTube           | Google Cloud Storage |
| Facebook          | Tectonic            |

## Blob store system design

### 1. Requirements

#### Functional requirements

1. **Create, Delete, List a Container** - The users should be able to create containers in order to group blobs. A single blob store user can create many containers, and each container can have many blobs, as shown in the following illustration

![alt text](PNG/bs1.PNG "Title")  

**in AWS S3** - To store your data in Amazon S3, you first create a bucket (here bucket is container) and specify a bucket name and AWS Region. Then, you upload your data to that bucket as objects in Amazon S3. Each object has a key (or key name), which is the unique identifier for the object within the bucket.

2. **Put, Get, Delete blob store data**

#### Non-Functional requirements

1. Availability
2. Durability
3. Scalibility
4. Consistency

### Building blocks required to design bolb store

![alt text](PNG/bs2.PNG "Title")  
