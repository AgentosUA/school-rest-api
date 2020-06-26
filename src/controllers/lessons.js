const mongoose = require('mongoose');
const Lesson = require('../models/teacher');

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
      status: 404,
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
  const { title, groups, room } = req.body;
  const validErrors = validationResult(req);

  if (!validErrors.isEmpty()) {
    return res.status(400).json({
      error: 'Some fields are empty!',
      status: 400,
    });
  }

  const lesson = new Lesson({
    title,
    groups: groups || [],
    room,
  });

  try {
    await lesson.save();
    res.status(201).json({
      message: 'Lesson created successfully!',
      error: false,
      status: 201,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Something went wront on the server!',
      status: 500,
    });
  }
};