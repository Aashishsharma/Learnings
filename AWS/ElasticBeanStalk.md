# ElasticBeanStalk
- fully managed Platform-as-a-Service (PaaS), similar to heroku 
- simplifies deploying and scaling web applications 
- automatically handles capacity provisioning, load balancing, auto-scaling, and health monitoring. 
- we just need to focus on code
- if we don't use beanstalk then we need to provision servers, security, networking
- create beanstalk - provide name, provide runtime env, upload your code, some other settings and you are good to go

![alt text](PNG/ELB1.PNG "Title")  
![alt text](PNG/ELB2.PNG "Title") 

### Creating ELB application
![alt text](PNG/ELB3.PNG "Title")  
![alt text](PNG/ELB4.PNG "Title")  
![alt text](PNG/ELB5.PNG "Title")  
![alt text](PNG/ELB6.PNG "Title")  
- Once the application is created, open the Domain, and your webapp is up and running
![alt text](PNG/ELB7.PNG "Title")  


![alt text](PNG/ELB8.PNG "Title")  

### AWS Code commit
- AWS's version of git
- private, secure, and can be integrated with other services

### AWS code build
- pull code from AWS code commit, and build it and create artifacts

### AWS code pipeline
- similar to bamboo, for CI/CD
- here we configure different steps to push the code to prod

**use AWS code commit to comit the code, AWS code build will build the code, and Codepipeline will deploy it to beanstalk (or any other AWS servcie, not just beanstalk)**

### CodeArtifact
- similar to npm registry or Maven repository. It's a managed artifact repository service that acts as a private repository for packages (npm, Python, Maven, etc.) 
