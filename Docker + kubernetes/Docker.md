## Docker (container runtime)

#### Docker vs VM
**Levels in machine** - Hardware -> Kernel -> Applications  
**Docker** - Virtualization at application level, hence small in size, fast start/stop  
**VM** - at app + kernel level, large size in GBs, slow start/stop

#### Containers  
**Namespaces + own filesystem + controlgroups (CGroups)**
1. They package application with all necessary dependencies and configurations  
2. Running instance of an image (obj. in terms of java)

**COMMANDS**
1. List all running containers - ```docker ps```

#### Images
1. It is an actual package
2. Artifact that can be moved around (class in terms of java)\

