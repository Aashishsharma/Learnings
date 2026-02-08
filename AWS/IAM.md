# IAM - Identity and Access Management

## 4 ways to log in to AWS
1. Using root credentials - typically only one or two per organization
2. Using IAM credentials - one per employee in an organization
3. AWS CLI - using (accesskey)
4. AWS SDK - using accesskey

Note - the accesskeys are created under specific IAM user, so each IAM user will have its own accesskey and it will have same permissions as that of the IAM user

Each AWS account has one account ID. To log in via IAM, you will also have to provide the account ID, and then your IAM username and password.

Four sections in IAM

1. IAM User - A normal employee having access to AWS via IAM credentials
2. IAM policies - JSON documents that define permissions specifying which actions can be performed on which resources
3. IAM User groups - We attach policies to user groups, and then users can be added to those groups. Policies can also be assigned directly to a single IAM user.
4. IAM roles - These roles also consist of policies, and these roles are assigned to AWS services, so those AWS services can have access to other AWS services. E.g. for EC2 service to call IAM APIs, EC2 services needs to have an IAM role, so that IAM role has a IAMACCESS policy as allow

**IMP - IAM user - who have access to AWS account, IAM role - AWS resource (like EC2), IAM policies - set of rules which can be applied to both IAM user and IAM role**

## Sample IAM Policy Structure

Here's a sample IAM policy in JSON format, with comments explaining each field:

```json
{
  "Version": "2012-10-17",  // The version of the policy language. Use "2012-10-17" for most cases.
  "Statement": [  // An array of one or more policy statements.
    {
      "Effect": "Allow",  // Specifies whether the statement allows or denies access. Values: "Allow" or "Deny".
      "Action": "s3:GetObject",  // The AWS service actions that are allowed or denied. Can be a string or array of strings.
      "Resource": "arn:aws:s3:::mybucket/*"  // The AWS resources to which the actions apply. Can be a string or array of ARNs.
    }
  ]
}
```
