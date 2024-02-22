# Distributed Logging

In Distributed stystems, different logs are stored in different nodes

## Design

### 1. Functional requirement

1. Writing / Searching / Storing logs
2. Centralized logging visualizer - it should provide a unified view of globally separated services

### 2. Non-functional requirements

1. Low-latency
2. Availability 
3. Scalibility

### API design

1. ```write(unique_ID, message_to_be_logged)```
2. ```searching(keyword)```

### Building blocks

![alt text](PNG/dl1.PNG "Title")

**Apart from building blocks we will need custom developer created components in the system**  

1. **Log accumulator** - An agent that collects logs from each node and dumps them into storage. So, if we want to know about a particular event, we don’t need to visit each node
2. **Storage** - We’ll choose blob storage to save our logs.
3. **Log indexer** - distributed search building block to search logs
4. **Visualizer UI** - To provide unified view of all logs