# Route53
- it is a managed DNS - i.e, DNS service is managed by AWS
- so in Route53, we map the IP of a server (where our app is deployed, maybe EC2). with a domain url
![alt text](PNG/R531.PNG "Title") 

## R53 Policies
![alt text](PNG/R532.PNG "Title") 
1. simple - give url, get IP
2. weighted - R53 will ensure, 70& traffic goes to sever 1, 20 to server 2, and 10 to server 3, kind of loadbalancing
![alt text](PNG/R533.PNG "Title") 
3. latency based - R53 will ensure, users are given IP of server which are closed to them
4. Faliover routing policy - R53 will give IP of other server, if it sees one of the server is down

### Configuring Route53
1. Register Domain (ashish.com) - need to pay around $12/yr
2. Create A record in R53, map your server IP with subdomain - app1.ashish.com - EC2 instance IP