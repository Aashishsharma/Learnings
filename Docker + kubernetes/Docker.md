## Docker (container runtime)

#### Docker vs VM
**Levels in machine** - Hardware -> Kernel -> Applications  
**Docker** - Virtualization at application level, hence small in size, fast start/stop  
**VM** - at app + kernel level, large size in GBs, slow start/stop

#### Images
1. It is an actual package
2. Artifact that can be moved around (class in terms of java)\

#### Containers  
**Namespaces + own filesystem + controlgroups (CGroups)**
1. They package application with all necessary dependencies and configurations  
2. Running instance of an image (obj. in terms of java)

**COMMANDS**
1. Start container from image - ```docker run <image-name>``` -p for port, -d for detached
2. List all running containers - ```docker ps``` add -a to list running + stopped containers
3. Stop the container - ```docker stop <container-id>```
4. start container not from image - ```docker start <container-id>```  
Docker allows multiple apps with diff versions simultaneously like 2 diff ver of redis can be run, here redis is opened to just one port (6379), so this is possible because of -p hostport:containerport, no issues as long as host port is always diff

