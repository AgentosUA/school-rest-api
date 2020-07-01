const mongoose = require('mongoose');
const Lesson = require('../models/lesson');
const Group = require('../models/group');
const Teacher = require('../models/teacher');

const { validationResult } = require('express-validator');

exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    if (lessons.length < 1) {
      return res.status(404).json({
        error: 'No lessons found',
        status: 404,
      });
    }
    res.status(200).json({
      lessons,
      error: true,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Something went wront on the server!',
      status: 500,
    });
  }
};

exports.postNewLesson = async (req, res) => {
  const { title, groups, room, time, teacher } = req.body;
  const validErrors = validationResult(req);

  if (!validErrors.isEmpty()) {
    return res.status(400).json({
      error: 'Some fields are empty!',
      status: 400,
    });
  }

  const listOfGroups = await Group.find().where('_id').in(groups).lean();
  const teacherData = await Teacher.findById(teacher);

  if (!listOfGroups || !teacherData) {
    return res.status(404).json({
      error: 'No such a group or teacher!',
      status: 404,
    });
  }

  const lesson = new Lesson({
    title,
    groups,
    room,
    time,
    teacher,
  });
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await Group.updateMany({}, { $push: { lessons: lesson } })
      .where('_id')
      .in(groups);
    teacherData.lessons.push(lesson);
    await teacherData.save({ session: sess });
    await lesson.save({ session: sess });
    await sess.commitTransaction();
    res.status(201).json({
      message: 'Lesson created successfully!',
      error: false,
      status: 201,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Something went wront on the server!',
      status: 500,
    });
  }
};

exports.deleteLesson = async (req, res) => {
  const { id } = req.body;
  const validErrors = validationResult(req);

  if (!validErrors.isEmpty()) {
    return res.status(400).json({
      error: 'Some fields are empty!',
      status: 400,
    });
  }

  try {
    const lesson = await Lesson.findById(id);
    const sess = await mongoose.startSession();
    sess.startTransaction();

    await Group.updateMany({}, { $pull: { lessons: id } });

    if (!lesson) {
      return res.status(404).json({
        error: 'Lesson not found',
        status: 404,
      });
    }

    await lesson.remove();
    res.status(201).json({
      message: 'Lesson was deleted!',
      error: false,
      status: 201,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Something went wront on the server!',
      status: 500,
    });
  }
};
