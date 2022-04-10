import {gql} from 'apollo-server-express';

export default gql`
  type Connection {
    id: ID
    Quantity: Int
    ConnectionTypeID: ConnectionType
    LevelTypeID: LevelType
    CurrentTypeID: CurrentType
  }
  
  input ConnectionInput {
    id: ID
    Quantity: Int
    ConnectionTypeID: ID
    LevelTypeID: ID
    CurrentTypeID: ID
  }
`;