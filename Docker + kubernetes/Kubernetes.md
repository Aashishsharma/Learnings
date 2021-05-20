## Kubernetes - open source container orchestration tool by Google
**More microservices apps, more containers, hence need K8**  

###### Jobs of orchestration tool
1. High availability
2. Scalability
3. Managing and maintaing containers  

## K8 componenets
1. **Node** - (Machine physical/virtual)
2. **Pod** - smallest unit (abstraction over container, additional layer over container, why, k8 interact with pod, because container runtime can change (mostly docker is used)), each pod gets IP, which is used to communicate between diff. pods
3. **Service** - permanent IP to pod, since pods may die, new pod is created, then IP would be diff. to acoid this - service
4. **Ingress - External service -** allow external world (browser) to connect to pod, by passing the req, to internal services
5. **ConfigMap** - Env vars - no need to rebuild pod/images
6. **Secrets**