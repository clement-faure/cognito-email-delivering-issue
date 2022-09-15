const typeDefs = /* GraphQL */ `
  scalar Upload

  type User {
    email: String
  }

  type UsersImport {
    importedUsersCount: Int!
  }

  type Query {
    user: User!
  }

  type Mutation {
    importUsers: UsersImport!
  }
`;

export default typeDefs;
