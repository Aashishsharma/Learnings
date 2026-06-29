# IAM - Identity and Access Management (Global service)

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
3. IAM User groups - simplify permission management by assigning permissions to groups instead of individual users. 
- IAM policies are typically attached to **groups** (though they can also be attached directly to users).
- Users are added to groups such as **Developers**, **DevOps**, or **Marketing**, and inherit the group's permissions.
- A user can belong to multiple groups and receive permissions from all of them.
- Example: A Marketing group may have access to S3 but not EC2, while a DevOps group may have access to both.

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

**IAM policy priority**  -
- by default no user / IAM role has access to any service - DEFAULT_DENY
- if explicitly DENY is mentioned, then no access
- if ALLOW is present, then only access is granted to that service
- if BOTH ALLOW and DENY is there, then DENY will take precedence

![alt text](PNG/IAM1.PNG "Title")  
- e.g. if IAM role from EC2 to access s3 is removed, EC2 instance can still access s3 if access is given via bucket policy (ARN of EC2 instance is added in the bucket policy)  
- similarly if IAM gives access to EC2 to ready s3 obj, but bucket policy is configured to deny read access, then even if EC2 has correct IAM, but still cannot access s3, because DNEY takes precedence

### IAM Access advisor
- now it's name is changed to last access
- works at user level, you goto a particular IAM user, and select access advisor
- it shows which service was last accessed by this user, we if few services are never accessed by this user, or were accessed long time back, we can remove this
- this aligns with AWS's least access previlage principle

### Cloudshell
- AWS CLI on cloud
- login to console, you will see option for cloudshell, then it will open terminal in the browser, and that terminal is already autenticated to AWS via the IAM role, that you are logged in with
- this service is not available for all the regions

### STS - (Security Token Service)
AWS STS is a service that provides temporary, short-lived security credentials (Access Key, Secret Key, Session Token) to users, applications, or AWS services instead of using long-term IAM credentials.

                    +----------------------+
                    | User / Application   |
                    | (IAM User / SSO /    |
                    |  EC2 / Lambda etc.)  |
                    +----------+-----------+
                               |
                               | 1. Request temporary credentials
                               |    (AssumeRole / GetSessionToken /
                               |     AssumeRoleWithWebIdentity ...)
                               v
                    +----------------------+
                    |      AWS STS         |
                    +----------+-----------+
                               |
                               | 2. Verifies identity
                               |    & IAM permissions
                               |
                               v
                    +----------------------+
                    | Generates Temporary  |
                    | Credentials          |
                    |----------------------|
                    | Access Key           |
                    | Secret Access Key    |
                    | Session Token        |
                    | Expiration Time      |
                    +----------+-----------+
                               |
                               | 3. Returns credentials
                               v
                    +----------------------+
                    | User / Application   |
                    +----------+-----------+
                               |
                               | 4. Uses temporary credentials
                               v
                    +----------------------+
                    | AWS Services         |
                    | S3, DynamoDB,        |
                    | Lambda, EC2, etc.    |
                    +----------------------+

          Credentials automatically expire.

| STS API | Primary Purpose | Authentication Input | Common Use Case | Returns |
|----------|-----------------|----------------------|-----------------|----------|
| `AssumeRole` | Assume an IAM Role | AWS credentials (IAM User/Role) | Cross-account access, EC2, Lambda, ECS | Temporary credentials |
| `GetSessionToken` | Temporary credentials for an IAM User | IAM User credentials (optionally MFA) | MFA-enabled CLI/API access | Temporary credentials |
| `AssumeRoleWithWebIdentity` | Authenticate using an OIDC/JWT token | Web Identity token (Google, GitHub, Kubernetes, Cognito, etc.) | Mobile apps, EKS IRSA, GitHub Actions | Temporary credentials |
| `AssumeRoleWithSAML` | Authenticate using a SAML assertion | SAML assertion from an Identity Provider | Enterprise SSO (ADFS, Okta, Azure AD, etc.) | Temporary credentials |
| `GetFederationToken` | Temporary credentials for federated users | IAM User credentials | Legacy federation scenarios with custom identity brokers | Temporary credentials |

