const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) =>
        `${createdAt.toLocaleTimeString()} ${createdAt.getMonth() + 1}/${createdAt.getDate()}/${createdAt.getFullYear()}`
    },
    username: {
      type: String,
      required: true
    },
    reactions: [Reaction]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return `${this.reactions.length}`;
});

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
