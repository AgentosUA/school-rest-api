const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lessons: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Lesson',
    },
  ],
});

module.exports = mongoose.model('Teacher', teacherSchema);
