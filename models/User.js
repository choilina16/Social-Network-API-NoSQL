// Activity  as reference!

// Require schema and types from mongoose
const { Schema, Types } = require('mongoose');

// Construct a new instance of the schema class
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // https://www.codegrepper.com/code-examples/whatever/mongoose+validate+match+regex
      validate: [validateEmail, 'PLease fill a valid email address'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    // self-reference
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = userSchema;
