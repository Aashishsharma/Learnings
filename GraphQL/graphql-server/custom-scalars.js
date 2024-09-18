import { GraphQLScalarType } from 'graphql';

// using custom scalar types
// 1. Declare and use custom scalar type in the Schema
// 2. Define scalar using **GraphQLScalarType() method**
// 3. Register the newly created scalar in resolvers

// STEP 2 - define custom scalar type
export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Custom Date scalar type',
  // Serialize the date to send to the client (Convert JS Date object to ISO string)
  serialize(value) {
    console.log({ value }, typeof value);
    if (value instanceof Date) {
      // If it's a Date object, convert it to YYYY-MM-DD
      return value.toISOString().split('T')[0];
    } else if (typeof value === 'string') {
      // If it's already a string (ISO format), just extract the date part
      return value.split('T')[0];
    }
    return null;
  },
  // Parse value from the client input (e.g. for mutation or query variables)
  parseValue(value) {
    return value ? new Date(value) : null; // Convert incoming string to Date
  },
});
