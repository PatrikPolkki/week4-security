import connectionType from '../models/connectionTypes';

export default {
  Query: {
    connectiontypes: async (parent, args) => await connectionType.find(),
  },
  Connection: {
    ConnectionTypeID: async (parent, args) => {
      console.log('ConnectionTypeID', parent.ConnectionTypeID);
      return connectionType.findById(parent.ConnectionTypeID);
    },
  },
};
