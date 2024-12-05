const User = require('../models/user');

const userResolver = {
  Query: {
    getUsers: async () => {
      return await User.findAll();
    },
    getUser: async (_, { id }) => {
      return await User.findByPk(id);
    }
  },
  Mutation: {
    createUser: async (_, { first_name, last_name, email }) => {
      return await User.create({ first_name, last_name, email });
    }
  }
};

module.exports = userResolver;
