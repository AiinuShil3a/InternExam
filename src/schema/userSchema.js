const { gql } = require('apollo-server-express');

const userSchema = gql`
  type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(first_name: String!, last_name: String!, email: String!): User
  }
`;

module.exports = userSchema;
