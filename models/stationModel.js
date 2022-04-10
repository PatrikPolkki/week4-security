'use strict';
import mongoose from 'mongoose';
import connections from '../models/connections';

const Schema = mongoose.Schema;

const stationSchema = new Schema({
  Title: String,
  Town: String,
  AddressLine1: String,
  StateOrProvince: String,
  Postcode: String,
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      default: 'Point', // 'location.type' must be 'Point'
    },

    coordinates: {
      type: [Number],
      required: true,
    },
  },
  Connections: [
    {
      type: Schema.Types.ObjectId,
      ref: connections,
    },
  ],
});

export default mongoose.model('Station', stationSchema);
