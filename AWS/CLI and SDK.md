# CLI and SDK

### EC2 instance metadata
- service available **inside an EC2 instance** which provides information about the instance and temporary AWS credentials.
- Accessible only from the instance itself.
- so bascially for EC2 instance to know what is host, IP or any other details like which IAM role the instance has we use this service
- EC2 instance call this endpoint http://169.254.169.254/latest/meta-data/ and get the details