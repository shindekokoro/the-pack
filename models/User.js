const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (v) =>
          /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v),
        message: (input) => `${input.value} is not a valid email address!`
      }
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

userSchema.virtual('friendCount').get(function () {
  return `${this.friends.length}`;
});

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
