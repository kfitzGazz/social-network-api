const { Schema, model } = require('mongoose');
const reactionsSchema = require('./Reaction');

// Schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get:(newDate)=>newDate.toLocaleDateString(),
    },
    username: {
      type: String,
      required: true,
    },
    
    reactions: [reactionsSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `responses` that gets the amount of response per video
thoughtSchema
  .virtual('reactionCount')
  
  .get(function () {
    return this.reactions.length;
  });

// Initialize thought
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
