import levelType from '../models/levelModel';

export default {
  Query: {
    leveltypes: async (parent, args) => await levelType.find(),
  },
  Connection: {
    LevelTypeID: async (parent, args) => {
      console.log('LevelID', parent.LevelID);
      return levelType.findById(parent.LevelID);
    },
  },
};

