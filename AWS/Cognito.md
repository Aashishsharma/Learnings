# Cognito
- AWS managed authentication and user management service that helps you sign up, sign in, and control access for web and mobile applications.

![alt text](PNG/Cognito1.PNG "Title") 

![alt text](PNG/Cognito.PNG "Title")  

![alt text](PNG/Cognito3.PNG "Title") 

## Cognito User Pools (CUP)
![alt text](PNG/Cognito2.PNG "Title")  
- **Creating cognito user pool- hands on**
![alt text](PNG/Cognito4.PNG "Title")  
![alt text](PNG/Cognito5.PNG "Title")  
![alt text](PNG/Cognito6.PNG "Title")  
![alt text](PNG/Cognito7.PNG "Title")  
- create custom login UI
![alt text](PNG/Cognito8.PNG "Title")  
- add your own mesaage templates
![alt text](PNG/Cognito9.PNG "Title")  
![alt text](PNG/Cognito10.PNG "Title")  

**CUP can trigger lambdas on user login/signup**

### AWS Cognito Integration (Frontend + Backend)

### 1. Create Cognito Resources

- Create a **User Pool**
- Create an **App Client** (without client secret for SPA)
- Configure:
  - Callback URL: `http://localhost:3000/callback`
  - Sign-out URL: `http://localhost:3000`
- Enable **Authorization Code Grant**
- Note:
  - Region
  - User Pool ID
  - App Client ID
  - Cognito Domain

---

### 2. Configure Cognito SDK (Frontend)

```javascript
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";

const userPool = new CognitoUserPool({
  UserPoolId: "ap-south-1_xxxxx",
  ClientId: "xxxxxxxxxxxxxxxx"
});
```

---

### 3. Sign Up (Optional)

```javascript
userPool.signUp(
  "john@example.com",
  "Password@123",
  [],
  null,
  (err, result) => {
    console.log(result.user.getUsername());
  }
);
```

---

### 4. Confirm User (OTP) (optional)

```javascript
const user = new CognitoUser({
  Username: "john@example.com",
  Pool: userPool
});

user.confirmRegistration(
  otp,
  true,
  console.log
);
```

---

### 5. Login Using SDK

```javascript
const user = new CognitoUser({
  Username: "john@example.com",
  Pool: userPool
});

const auth = new AuthenticationDetails({
  Username: "john@example.com",
  Password: "Password@123"
});

user.authenticateUser(auth, {
  onSuccess(session) {

    const accessToken =
      session.getAccessToken().getJwtToken();

    const idToken =
      session.getIdToken().getJwtToken();

    const refreshToken =
      session.getRefreshToken().getToken();
  }
});
```

> **If you use the Cognito SDK like above, you do not need the Hosted UI or Callback URL.** The SDK talks directly to Cognito.

---

### 6. Backend JWT Validation

```javascript
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const client = jwksClient({
  jwksUri:
    "https://cognito-idp.ap-south-1.amazonaws.com/<USER_POOL_ID>/.well-known/jwks.json"
});

function authenticateJWT(req, res, next) {

  const token =
    req.headers.authorization?.split(" ")[1];

  jwt.verify(
    token,
    (header, cb) => {
      client.getSigningKey(header.kid, (err, key) => {
        cb(null, key.getPublicKey());
      });
    },
    {
      issuer:
        "https://cognito-idp.ap-south-1.amazonaws.com/<USER_POOL_ID>"
    },
    (err, decoded) => {

      if (err)
        return res.sendStatus(401);

      req.user = decoded;
      next();
    }
  );
}
```

Use it:

```javascript
app.get("/users", authenticateJWT, (req, res) => {
  res.json(req.user);
});
```

---

#### Complete Flow (SDK Login)

```text
Frontend
    │
    ▼
Cognito SDK
    │
    ▼
authenticateUser()
    │
    ▼
Cognito
    │
    ▼
JWT Tokens
    │
    ▼
Authorization: Bearer <Access Token>
    │
    ▼
Backend validates JWT
    │
    ▼
Protected API
```

---

### Complete Flow (Hosted UI)

```text
Frontend
    │
    ▼
Redirect to Cognito Hosted UI
    │
    ▼
User Login
    │
    ▼
Callback URL
    │
    ▼
Authorization Code
    │
    ▼
Exchange Code → JWT Tokens
    │
    ▼
Authorization: Bearer <Access Token>
    │
    ▼
Backend validates JWT
    │
    ▼
Protected API
```


## Cognito Identity pools
- A service that provides temporary AWS credentials to authenticated or guest users, allowing them to securely access AWS services like S3, DynamoDB, and API Gateway.
- so instead of giving IAM creds to 100s of users, use identity pool

![alt text](PNG/Cognito11.PNG "Title")  
- **usecase** - Allow 100s of users to upload photos/videos directly from a web or mobile app to **Amazon S3**
- why not create a webapp, where app will allow users to upload file, and app will push it to s3?
- **The question is whether the upload goes through your backend or directly to S3.**
- identity pools bypass the file being passed to our BE and then to s3