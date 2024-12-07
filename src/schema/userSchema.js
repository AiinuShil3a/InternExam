const { gql } = require('apollo-server-express');

const userSchema = gql`
  type CmsAccount {
    cms_account_id: Int
    cms_firstname: String
    cms_lastname: String
    cms_email: String
    cms_role_id: Int
    cms_mobile_number: String
    cms_mobile_country_code: String
  }

  type Response {
    success: Boolean
    message: String
  }

  input CmsUserCreateAdminInput {
    cms_firstname: String!
    cms_lastname: String!
    cms_email: String!
    cms_role_id: Int!
    cms_mobile_number: String
    cms_mobile_country_code: String
  }

  type Mutation {
    cmsUserCreateAdminAccount(
      input: CmsUserCreateAdminInput!
    ): Response
  }
`;

module.exports = userSchema;
