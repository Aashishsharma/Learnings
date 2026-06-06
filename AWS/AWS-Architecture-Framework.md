# AWS Architecture Framework

## AWS Well-Architected Framework - 6 Pillars

## 1. Operational Excellence
- Focuses on running, monitoring, and continuously improving systems.
- Use automation to reduce manual effort and human errors.
- **Example:** Automating deployments using CI/CD pipelines.

## 2. Security
- Protects data, systems, and resources from unauthorized access.
- Implements least-privilege access, encryption, and monitoring.
- **Example:** Using IAM roles and encrypting S3 data.

## 3. Reliability
- Ensures applications can recover from failures and continue operating.
- Design for fault tolerance and automatic recovery.
- **Example:** Deploying applications across multiple Availability Zones.

## 4. Performance Efficiency
- Uses the right resources to meet workload requirements efficiently.
- Continuously optimize as technology and demand change.
- **Example:** Using Auto Scaling to handle traffic spikes.

## 5. Cost Optimization
- Avoids unnecessary spending while meeting business requirements.
- Pay only for what you use and choose cost-effective services.
- **Example:** Using Spot Instances for non-critical workloads.

## 6. Sustainability
- Minimizes environmental impact by using resources efficiently.
- Optimize workloads to consume less compute, storage, and energy.
- **Example:** Using serverless services like Lambda instead of always-on servers.

### AWS Well-Architected Tool

- A service which evaluates workloads against AWS best practices, identifies risks, and provides recommendations for improvement.
- Identifies architectural risks and provides recommendations to improve cloud workloads.
- Generates improvement plans and tracks remediation progress over time.
- Useful for validating whether an application follows AWS best practices.

**Example:** An e-commerce application is reviewed using the Well-Architected Tool. The tool identifies that the database is deployed in a single Availability Zone and recommends Multi-AZ deployment to improve reliability.

### AWS Customer Carbon Footprint Tool

- A reporting tool that helps customers measure the carbon emissions associated with their AWS usage.
- Provides insights into the estimated carbon footprint of AWS workloads over time.
- Helps organizations track sustainability goals and identify opportunities to reduce environmental impact.
