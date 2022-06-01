## Docker (container runtime)

#### Docker vs VM
**Levels in machine** - Hardware -> Kernel -> Applications  
**Docker** - Virtualization at application level, hence small in size, fast start/stop  
**VM** - at app + kernel level, large size in GBs, slow start/stop

#### Images
1. It is an actual package
2. Artifact that can be moved around (class in terms of java)

**Commands**  
1. ```docker images```
2.```docker pull <image-name:version>```
2. ```docker image rm <img-name>```
3. ```docker tag <existing-image:version> to new-ecr-domain-image:version```  
this creates new image and adds the tag so that this image can be pushed to any other container registry like ECR and then push
4. ```docker push <image-name:version>``` also first do docker login


#### Containers  
**Namespaces + own filesystem + controlgroups (CGroups)**
1. Layers of images
2. They package application with all necessary dependencies and configurations, also portable 
3. Running instance of an image (obj. in terms of java)

**COMMANDS**
1. Start **new** container from image - ```docker run <image-name>``` -p for port, -d for detached, --name, --net for network, -e for env. vars, -v(volumes) host-dir:contianer-dir (if image not available, it will check in docker hub)
2. List all running containers - ```docker ps``` add -a to list running + stopped containers
3. Stop the container - ```docker stop <container-id>```
4. start **existing** container not from image - ```docker start <container-id>``` 
5. remove container - ```docker container rm <container-id>```
6. logs ```docker logs <container-id>``` -tail 100 - show last 100 line, -f - to stream the logs
7. logs - imp for debugging- ```docker exec -it <container-id> /bin/bash or /bin/sh```  - to start the terminal in the running container

**port binding -**  
Docker allows multiple apps with diff versions run simultaneously like 2 diff ver of redis can be run, here redis is opened to default port (6379), so now there are 2 containers (running instances of 2 diff redis version) and both exposing to port 6379, so this is possible because of -p hostport:containerport, no issues as long as host port is always diff.  

#### Network
Allow different contianer (mongo container can talk to mongo-express container) within same docker to talk to each other  
**Commands**  
1. ```docker network create <network-name>```
```docker network create mongo-network```  use this network name on dcoer-run command - see docker run command above  
2. ```docker network ls```

## Sample application
Creating Node js app to connect to MongoDB db and connect MongoDB db with mongo-express so that we can use
the UI for MongoDB db 

### Step 1. Create docker network  
```docker network create mongo-network```  

### Step 2. Create mongoDB container and mongo-express container both within same network
```docker run -d \                             -- run in detached mode
-p 27017:27017 \                               -- specify host and docker port
-e MONGO_INITDB_ROOT_USERNAME=admin \  -- this is env. variable required as mentioned in mondoDB docker docs
-e MONGO_INITDB_ROOT_PASSWORD=password \
--name mongoDB \                               -- optional name to the container
--net mongo-network \                 -- create this in the network (mongo-network) which we created above
mongo                                 -- image name form which the container should be created
``` 

### Step 3. Similar to mongoDB container, create mongo-express container
```docker run -d \
-p 8080:8080 \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \  -- required from ME docker docs to connect to mongoDB container
-e ME_CONFIG_MONGODB_ADMINPASSWORD=password \ -- should be same as mondoDB credentials we used above
-e ME_CONFIG_MONGO_DB_SERVER=mongoDB \ -- should be the container name of mongoDB container (mentioed in docs)
--new mongo-network \                        -- network name should be same as used in mondoDB container
--name mongo-express \ 
mongo-express
```
Now we can use mongo-express container running at localhost:8081  
We can use this UI to create DBs and tables and add data  

To avoid running above commands to start all containers isn't ideal, so we use docker-compose
**Docker compose**
Run multiple services in one go, simpler, better than running docker commands individually  
Version is version of docker compose in the image below  
![alt text](PNG/docker-compose.PNG "Title")  
in docker-compose network is automatically created  
```docker-compose -f <yaml-file-name> up/down```

### Step 4. Connect Node app with MongoDB container
```javascript
// Write node code to connect to MongoDB
MongoClient.connect('mongodb://admin:password@localhost:27017') 
// these details are comming from the mongoDB container we created in step 1
```
Note - When the MongoDB container restarts, all the data in MongoDB is lost. Te data stored in the database is only available when the container is running. So to permanently store the data inside the container we use **Volumes** see volumes section  

### Step 5. Create our own docker image of the node js app
Our app is ready, but we need to containerize the node js app as well. To create our own custom docker image, we use dockerfile

**Dockerfile(exact name) - Blueprint for building images**
Create docker file for our node js app we created in step 4
```
From node:14(latest default)
WORKDIT /app - makes this current directory for the container
ENV key=val - preferred to set this in docker-compose
RUN <any linux command> - runs while buliding image (RUN commands can be multiple)
COPY . .  - why not use RUN <linux-copy-command> instead of using COPY command of docker? -> any linux
            command that we run us run within docker container, bu we need to copy files from host system
            to the docker env, hence we use this COPY command
CMD ["node", "server.js"] - runs when staring the container (CMD command can be used only once)
```
add \ for a command to be multiline

### Step 6. Building image from Dockerfile created in step 5
```docker build -t <image-name:version> .``` -t to sepcify image name, and use . or path to Dockerfile  
create all images from Dockerfile and then create your app at once using docker-compose  
Docker build command is run in CI/CD - jenkins, bamboo  
Any change in docker file would requires us to build the image again usign docker build command

### Step 7. Start the node js container from using docker-compose
In docker-compose.yml file add node js container as a new service, and give required env, ports so that using one docker-compose command all the app is started.  
**Note - the port(hostport:dockerpost) given in the node js service is the one we would be using to access the application from host machine**

#### Docker volumes - to persist data in docker
Container restarted data lost so need vloumes  
**Internal working** - a directory from virtual filesystem (container) is mounted to the host file system  
**3 Types** -  
1. Host volumes - ```docker run -v host-dir:container-dir```  
2. Anonymosy volumes - ```docker run -v container-dir``` host-dir = /var/lib/docker/volumes/hash/_data  
3. Named values (preferred) - ```docker run -v name:container-dir``` host-dir - same as above  
**Note - the contianer-dir defres for each DB**  
1. For myslq - /var/lib/mysql
2. For mongo - /data/db
3. For postgres - /var/lib/postgres/data  

in docoker-compose ->
![alt text](PNG/volumes.PNG "Title")  
also under volumes section add driver:local