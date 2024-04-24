# SFMC Custom log activity

## Purpose

In SFMC we have journey builder, but in our case we explicitly wanted to log more details of the users, and no inbuilt JB activity had that functionality. So created a new custom activity  

### Followed 12 factor app methodology

1. Codebase tracked in VCS (git)
2. Explicitly declare and isolate dependencies (npm)
3. Store config in the environment
4. Treat backing services as attached (not tied to app) resources like (DBs / MQs) (app should be able to swap out a local MySQL database with one managed by a third party (such as Amazon MYSQL) without any changes to the app’s code.)  
5. Strictly separate build and run stages
6. Execute the app as one or more stateless processes (kind of microservice)
7. Keep development, staging, and production as similar as possible
8. Treat logs as event streams
9. Maximize robustness with fast startup and graceful shutdown
10. App should be scalable withoud code changes

## Working of custom log activity

### Step 1. Create the custom activity

1. Custom activity UI (webapp) - Contains the activity's code and assets and is hosted on a public web server.(HTTPS)
2. Config.json - Application extension that defines your custom activity.

```json
{
 "workflowApiVersion": "1.1",
 "metaData": {
  "icon": "images/sms.png",
  "category": "message"
 },
 "type": "myActivityType",
 "lang": {
  "en-US": {
   "name": "Custom Activity (Workflow API v1.1)",
   "description": "desc"
  }
 },
 "arguments": {
  "execute": {
   "inArguments": [{
    "myInArgument": "inArgument coming from iframe"
   }],
   "outArguments": [],
   "timeout": 100000,
   "retryCount": 1,
   "retryDelay": 10000,
   "concurrentRequests" : 5,
   "url": "https://some-endpoint.com/execute"
  }
 },
 "configurationArguments": {
  "save": {
   "url": "URI/for/your/activity/save"
  },
  "publish": {
   "url": "URI/for/your/activity/publish"
  },
  "validate": {
   "url": "URI/for/your/activity/validate"
  },
  "stop": {
   "url": "URI/for/your/activity/stop"
  }
 },
 "wizardSteps": [{
   "label": "Step 1",
   "key": "step1"
  },
  {
   "label": "Step 2",
   "key": "step2",
   "active": false
  },
  
 ],
 "userInterfaces": {
  "configModal": {
   "height": 200,
   "width": 300,
   "fullscreen": true
  }
 },
 "schema": {
  "arguments": {
   "execute": {
    "inArguments": [{
     "myInArgument": {
      "dataType": "<some data type>",
      "isNullable": false,
      "direction": "in"
     }
    }],
    "outArguments": []
   }
  }
 }
}
```

3. CustomActivity.js - Contains Postmonger events and sits in between your configuration app in the iframe and Journey Builder.  

```javascript
connection.trigger('nextStep');
connection.trigger('prevStep');

```

### Step 2. Create the custom

Register the custom component endpoint in SFMC  
Custom activity is encoded using JWT. We get the jwt key from SFMC while registering the app in SFMC
