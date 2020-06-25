const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subjects: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Subject',
    },
  ],
});

module.exports = mongoose.model('Teacher', teacherSchema);
