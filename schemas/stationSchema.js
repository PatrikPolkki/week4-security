import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    stations(start: Int, limit: Int, bounds: Bounds): [Station]
    station(id: ID!): Station
  }
  
  extend type Mutation {
    addStation(Connections: [ConnectionInput], stationInfo: StationInfo): Station
    modifyStation(id: ID!, Connections: [ConnectionInput], stationInfo: StationInfo): Station
    deleteStation(id: ID!): Station

  }

  type Station {
    id: ID
    Connections: [Connection]
    Title: String
    AddressLine1: String
    Town: String
    StateOrProvince: String
    Postcode: String
    Location: PointObject
  }

  input PointObjectInput {
    coordinates: [Float]
  }
  
  type PointObject {
    coordinates: [Float]
    type: String
  }
  
  input StationInfo {
      Title: String
      Postcode: String
      AddressLine1: String
      StateOrProvince: String
      Town: String
      Location: PointObjectInput
   }

  
    input Bounds {
    _southWest: LatLng
    _northEast: LatLng
  }

  input LatLng {
    lat: Float
    lng: Float
  }
`;
