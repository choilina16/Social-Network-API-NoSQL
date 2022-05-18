// Activity 22 as reference!

// Require schema and model from mongoose
const { Schema, model } = require('mongoose');

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
      validate: [validateEmail, 'Please fill a valid email address'],
    },
    // array of _id values referencing the Thought model
    thought: [
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
    // id: false,
  }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function () {
  return this.friend.length;
});

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
