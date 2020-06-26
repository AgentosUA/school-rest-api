const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  group: 
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Group',
    },
});

module.exports = mongoose.model('Teacher', studentSchema);
