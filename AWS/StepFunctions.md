# AWS Step Functions

- A workflow orchestration service that coordinates multiple tasks and AWS services.
- Each step in the workflow can be a Lambda function, ECS task, API call, database operation, email notification, or even a human approval action.
- AWS Step Functions manages the sequence, retries, error handling, and state between steps.
- Useful when a business process involves multiple actions that must happen in a specific order.

**Example: Leave Approval Workflow**
1. Lambda: Store leave request in database.
2. Lambda: Send approval request to manager.
3. Human: Manager approves or rejects the request.
4. Lambda: Update leave status in database.
5. Lambda: Send notification to employee.

AWS Step Functions orchestrates all these steps and keeps track of the workflow state.

- **Step functions are written in JSON**

### Task state
> **A Task state performs a unit of work by invoking an external service, such as AWS Lambda, ECS, Batch, SNS, SQS, or another AWS SDK API.**

- ![alt text](PNG/Step1.PNG "Title")  

- **different state types** - 
| State Type | Purpose | Example Use Case |
|------------|---------|------------------|
| **Task** | Perform a unit of work by invoking Lambda, ECS, Batch, SNS, SQS, or any AWS SDK API | Process an order using a Lambda function |
| **Pass** | Pass input to the next state without doing any work | Add static data or test a workflow |
| **Choice** | Branch workflow based on conditions | If payment succeeds → ship order; else → cancel order |
| **Wait** | Pause execution for a duration or until a specific time | Wait 5 minutes before retrying |
| **Succeed** | Successfully end the workflow | Order processing completed |
| **Fail** | End the workflow with an error | Payment validation failed |
| **Parallel** | Execute multiple branches simultaneously | Process payment, inventory, and notification in parallel |
| **Map** | Repeat the same workflow for each item in a collection | Process each order item independently |

- ![alt text](PNG/Step2.PNG "Title")  
- see that the type here is task, it can be any from the above table, like choice, parallel