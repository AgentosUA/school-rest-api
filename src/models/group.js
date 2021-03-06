const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  students: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Student',
    },
  ],
  lessons: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Lesson',
    },
  ],
});

module.exports = mongoose.model('Group', groupSchema);
