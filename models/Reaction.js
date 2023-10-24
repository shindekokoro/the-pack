const { Schema, Types } = require('mongoose');
const { format_date } = require('../utils/helpers');

const Reaction = new Schema(
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
// We're currently only exporting the schema, but keeping as the "Model" for consistency.
module.exports = Reaction;