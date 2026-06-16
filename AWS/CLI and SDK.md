# CLI and SDK

### EC2 instance metadata
- service available **inside an EC2 instance** which provides information about the instance and temporary AWS credentials.
- Accessible only from the instance itself.
- so bascially for EC2 instance to know what is host, IP or any other details like which IAM role the instance has we use this service
- EC2 instance call this endpoint http://169.254.169.254/latest/meta-data/ and get the details
- this is how behind the scenes, EC2 is able to call s3. In the console, we just attach IAM role, but this is what happens behind the scenes
- this is just FYI for AWS users

### CLI profiles
- we login to AWS CLI by running command aws configure
- this will then ask for access id and key and then we can use this command to login and run CLI commands
- what if we have multiple AWS accounts? - use CLI profiles

Scenario 1: Personal + Company AWS Accounts

Configure profiles:

```bash
aws configure --profile personal
aws configure --profile company
```

This creates:

```text
~/.aws/credentials

[personal]
aws_access_key_id=...
aws_secret_access_key=...

[company]
aws_access_key_id=...
aws_secret_access_key=...
```

Use them:

```bash
aws s3 ls --profile personal #this will return s3 buckets from your personal AWS accounts
aws s3 ls --profile company  # from company AWS accounts
```

---

### A
