# Cloudformation (IaaS)
- build infra on AWS via code
- ![alt text](PNG/CF3.PNG "Title")  
- In CI/CD, install aws cli, and deploy your template from build pipeline
- AWS composer allows us to view all the component stack created by cloud formation (it creates architectural diagram)
- Cloud formation templates, once created can't be edited, they can only be replaces
- deleting CF template will delete all the resources created by that template

```yml
Parameters: # this will show a custom input field on AWS while uploading this template
  SecurityGroupDescription: # whateer we enter in the input field will be the name of security group desc
    Description: Security Group Description 123eee
    Type: String

Resources: # creating EC2 intance
  MyInstance: # this is the name of the instance which will be created
    Type: AWS::EC2::Instance 
    Properties:
      AvailabilityZone: us-east-1a
      ImageId: ami-0453ec754f44f9a4a # Amazon machine instance id, this is fixed and available on internet
      InstanceType: t3.micro # instance type
      SecurityGroups:
        - !Ref SSHSecurityGroup # this is referneced here, defined below
        - !Ref ServerSecurityGroup # referenced here, defined below

  # an elastic IP for our instance
  MyEIP:
    Type: AWS::EC2::EIP
    Properties:
      InstanceId: !Ref MyInstance # attach this IP to MyInstance

  # our EC2 security group
  SSHSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable SSH access via port 22
      SecurityGroupIngress:
        - CidrIp: 0.0.0.0/0
          FromPort: 22
          IpProtocol: tcp
          ToPort: 22

  # our second EC2 security group
  ServerSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: !Ref SecurityGroupDescription # value that we entered in custom input field
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: 192.168.1.1/32

Outputs:t a
  ElasticIP:
    Description: Elastic IP Value
    Value: !Ref MyEIP

```
**the parameter we created above is now available in below cloud formation**
![alt text](PNG/CF2.PNG "Title") 

**We can view the template visually** 
- while creating CF stack, once we upload CF file, we see option to visualize the architecture
- once the clouf formation is created under template section

![alt text](PNG/CF.PNG "Title") 

**Instead of creating yml file by hand, we can use CDK (Cloud development kit)**  
- Using CDK we can write cloudformation template in JS/TS/Python, and using CDK, we can complie our ts file to cloudformation.yml file

e.g. CDK for Typescript for creating lambda function

```typescript
const { Stack } = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
const apigw = require('aws-cdk-lib/aws-apigateway');
class HelloLambdaStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);
    const fn = new lambda.Function(this, 'MyFunction', {
      code: lambda.Code.fromAsset('lib/lambda-handler'), // relative path to your lambda function
      runtime: lambda.Runtime.NODEJS_LATEST,
      handler: 'index.handler'
    });

    const endpoint = new apigw.LambdaRestApi(this, 'MyEndpoint', {
      handler: fn,
      restApiName: "HelloApi"
    });

  }
}
module.exports = { HelloLambdaStack }
```

**then run cdk synth** - this will synthesize AWS Cloudformation file for us