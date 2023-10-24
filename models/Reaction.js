const { Schema, Types } = require('mongoose');
const { format_date } = require('../utils/helpers');

const reactionSchema = new Schema(
  {
    reactionID: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: format_date
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
// We're currently only exporting the schema.
module.exports = reactionSchema;