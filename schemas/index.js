import {gql} from 'apollo-server-express';
import connectionSchema from './connectionSchema.js';
import connectionTypeSchema from './connectionTypeSchema.js';
import currentTypeSchema from './currentTypeSchema.js';
import levelTypeSchema from './levelTypeSchema.js';
import stationSchema from './stationSchema.js';
import userSchema from './userSchema.js';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [
  linkSchema,
  stationSchema,
  connectionSchema,
  connectionTypeSchema,
  currentTypeSchema,
  levelTypeSchema,
  userSchema,
];

