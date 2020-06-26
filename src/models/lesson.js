const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  group: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Group'
  },
  room: {
    type: Number,
    required: true,
  },
  time: {
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  teacher: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Teacher',
  },
});

module.exports = mongoose.model('Lesson', lessonSchema);
