# GraphQL - query language for API

## Concepts

### 1 . Primitive scalar types in gql

`Int | Float | String | Boolean | ID`

#### 2. Non-Premitive / custom scalar types

##### **1. Interface**

```graphql
# any type that implements Character needs to have these exact fields + more
interface Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}

# human type
type Human implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  starships: [Starship]
  totalCredits: Int # interface fileds + more fields
}
```

##### **2. Unions** -

`union SearchResult = Human | Droid | Starship`

##### **3. Custom scalar types** -

Date is not a built in scalar type in graphql, however we can create our custom scalar types implementation.

**Steps to create custom scalar types in gql**

1. Declare scalar in the Schema
2. Define scalar using **GraphQLScalarType() method**
3. Implement serialize / parsevalue functions to determine how the new scalar type would be serialized or deserialized?
4. Register the newly created scalar in resolvers

**Step 1 - Declare Schema**

```graphql
scalar Date
type Event {
  id: ID!
  name: String!
  date: Date!
}
```

**2 3 and 4. Define scalar** -

```javascript
import { GraphQLScalarType, Kind } from "graphql";

// Define the Date scalar
// STEP 2
const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Custom Date scalar type",
  // Serialize the date to send to the client (Convert JS Date object to ISO string)
  // STEP 3
  serialize(value) {
    return value instanceof Date ? value.toISOString() : null;
  },
  // Parse value from the client input (e.g. for mutation or query variables)
  parseValue(value) {
    return value ? new Date(value) : null; // Convert incoming string to Date
  },
});

// Define your resolvers
const resolvers = {
  Date: dateScalar, // SETP 4, we need to register the new scalar type in the resolvers
  Query: {
    events: () => [
      { id: "1", name: "Event 1", date: new Date("2024-09-01") },
      { id: "2", name: "Event 2", date: new Date("2024-10-01") },
    ],
  },
};
// Export resolvers and typeDefs
export { resolvers, typeDefs };
```

### Type Definitions

```graphql
type Character {
  name: String! # ! means it is required field
  appearsIn: [Episode!]! # !]! means episode arr is req, as well as elem inside arr is required
}
```
