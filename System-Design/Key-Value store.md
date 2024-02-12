# Key value store

Key-value stores are distributed hash tables (DHTs). 

## API design

Key-value stores, like ordinary hash tables, provide two primary functions, which are get and put.

1. get api
```get(key)``` - in eventual consistency, there might be more than one value returned against a key
2. put api
```put(key, value)``` - A value can be a blob, image, server name, or anything the user wants to store, we generally don't store blobs, but we can definitely store links to those blobs 
