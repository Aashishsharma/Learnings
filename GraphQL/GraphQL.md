# GraphQL - query language for API

## Concepts

### 1. Type Definitions

##### Primitive scaler types in gql

`Int | Float | String | Boolean | ID`

##### Non-Premitive / custom scaler types

```graphql
type Character {
  name: String! # ! means it is required field
  appearsIn: [Episode!]! # !]! means episode arr is req, as well as elem inside arr is required
}
```
