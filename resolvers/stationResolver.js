import Station from '../models/stationModel';
import Connection from '../models/connections';
import {rectangleBounds} from '../utils/rectangleBounds';
import {AuthenticationError} from 'apollo-server-express';

export default {
  Query: {
    stations: async (parent, args) => {
      const start = args.start || 0;
      const limit = args.limit || 10;
      const stations = await Station.find().skip(start).limit(limit);

      return args.bounds ? stations.find().
          where('Location').
          within(rectangleBounds(
              args.bounds._northEast,
              args.bounds._southWest,
          )) : stations;
    },
  },
  Mutation: {
    addStation: async (parent, args, context) => {
      console.log(context);
      if (!context.user) {
        throw new AuthenticationError('ERROR');
      }
      const conns = await Promise.all(
          args.Connections.map(async (conn) => {
            const newConnection = new Connection(conn);
            const result = await newConnection.save();
            return result._id;
          }),
      );
      const newStation = new Station(args.stationInfo);
      newStation.Connections = conns;
      return newStation.save();
    },
    modifyStation: async (parent, args) => {
      const conns = await Promise.all(
          args.Connections.map(async (conn) => {
            await Connection.findOneAndUpdate({_id: conn.id},
                {
                  ConnectionTypeID: conn.ConnectionTypeID,
                  LevelID: conn.LevelID,
                  CurrentTypeID: conn.CurrentTypeID,
                });
            const newConnection = new Connection(args);
            const result = await newConnection.save();
            return result._id;
          }),
      );
      const station = await Station.findOneAndUpdate(args.id, args.stationInfo);
      station.Connections = conns;
      return station.save();
    },
    deleteStation: async (parent, args) => {
      return Station.findOneAndDelete(args.id);
    },

  },

};

