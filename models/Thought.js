const { Schema, Types } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      // Set default value to the current timestamp
      // Use a getter method to format the timestamp on query
    },
    username: {
      type: String,
      required: true,
    },
    reactions: {
      // Array of nested documents created with the `reactionSchema`
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = thoughtSchema;
