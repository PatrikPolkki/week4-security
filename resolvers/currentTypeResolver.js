import currentType from '../models/currentTypeModel';

export default {
  Query: {
    currenttypes: async (parent, args) => await currentType.find(),
  },
  Connection: {
    CurrentTypeID: async (parent, args) => {
      console.log('CurrentTypeID', parent.CurrentTypeID);
      return currentType.findById(parent.CurrentTypeID);
    },
  },
};
