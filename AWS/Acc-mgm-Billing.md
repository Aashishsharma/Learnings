# Account management & Billing

## AWS Organization
- global service used to manage multiple AWS accounts
- We create AWS org, then within that we create multiple AWS accounts, or if accounts already exists, we send invite emaik to those accounts, then those accs receive invitation in AWS console, when accepted, that AWS acc is now part of the org
- we get consolidated billing across accounts under this organization
- EC2 instances reserved in one AWS acc, can be used by another AWS acc, if they are in the same org
- ability to restrict AWS account previliges using Service Control Policy
- SCP - Service control policy - in this we define rules that withing AWS Org, which AWS account or IAM user / roles has what restrictions
- E.g. S3 service should not be available to a child AWS acc - apply SCP
- lets say we have 1 org and 2 AWS accs, A and B, if we apply SCP policy to deny S3 access to Acc B, then even the root user of acc B, cannot access S3 on B. This is very powerful to control access across accounts for a company

### Multi account strategies
- A compnay can create account per department or per cost center or even per project
- instead of mult account, we can have one single account and create multiple VPCs which acts like a separate account