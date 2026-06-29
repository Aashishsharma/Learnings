# KMS - Key Management Service
- AWS will manage encryption keys for us
- fully intergated with IAM

## KMS key types

| Key Type | Who Owns & Manages the Key | Can You View the Key Material? | Pricing | Best Use Case | Notes |
|----------|-----------------------------|--------------------------------|---------|---------------|------|
| **AWS Owned Key** | AWS | ❌ No | **Free** | Default encryption for many AWS services | Used automatically by AWS; not visible or manageable by customers. |
| **AWS Managed Key** (`aws/service-name`) | AWS (per account/service) | ❌ No | **Free** (pay only for KMS API requests) | Simple encryption for a specific AWS service (e.g., S3, EBS, RDS) | Automatically created and rotated by AWS. |
| **Customer Managed Key (CMK)** | Customer | ❌ No (unless imported or external) | **Paid** (monthly key fee + API requests) | Full control over encryption, permissions, rotation, auditing | Recommended for production workloads requiring fine-grained control. |
| **Imported Key Material** | Customer | ✅ Yes (you generate and import it) | **Paid** | Bring Your Own Key (BYOK), compliance requirements | If imported key material expires or is deleted, the CMK becomes unusable until re-imported. |
| **External Key Store (XKS)** | Customer (external HSM) | ✅ Yes (stored outside AWS) | **Paid** (KMS charges + external HSM costs) | Strict compliance where keys must never reside in AWS | Key operations are performed by your external HSM. |

## KMS Key policy
- similar to bucket policy

A **Key Policy** is a **resource-based policy attached directly to a KMS key** that controls **who can use and manage that specific key**.

> **1-liner:** A Key Policy defines **who can access and manage a particular KMS key.**

### Example

Allow an IAM role to encrypt and decrypt data using the KMS key.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowAppRoleToUseKey",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:role/AppRole"
      },
      "Action": [
        "kms:Encrypt",
        "kms:Decrypt",
        "kms:GenerateDataKey"
      ],
      "Resource": "*"
    }
  ]
}
```

## How KMS works
![alt text](PNG/KMS1.PNG "Title")  
1. We call KMS encrypt API (via CLI / SDK) by passing the Customer Managed Key (CMK) (First we need to create CMK or any other Key in KMS, and assign Key policy to ut) and data that needs to be encrypted <= 4KB
2. The KMS service will check if the user / role has access to use the Key 
3. If yes, then KMS will do encryption, and will share us the encrypted data
4. To decrypt, we call KMS decrypt API (via CLI / SDK), and pass the encrypted data
5. KMS will take the encrypted data, it will figure out on it's own which CMK was used to encrypt the data
6. It will check if the user / IAM role has access to decrupt the data
7. If yes, it will share the decrypted data