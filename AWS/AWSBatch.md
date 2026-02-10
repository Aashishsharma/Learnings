# AWS Batch
- fully managed batch service
- are defined as docker images and run on ECS
- e.g. usecase - you upload image to s3, batch job runs are 3 PM and process tand store metadata in dynamoDB
- but then why not use lambda

### Lambda vs AWS Batch
- lambda is serverless, Batch - we need to provision EC2 to run batch job
- lambda can run only upto 15 mins, batch - no time limit
- so lambda can be used in above case, but it is tradeoff, you want to process all images at once at 2 PM or one by one, when the images are available
