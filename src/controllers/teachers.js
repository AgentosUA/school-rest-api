const mongoose = require('mongoose');
const Teacher = require('../models/teacher');

const { validationResult } = require('express-validator');

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    if (teachers.length < 1) {
      return res.status(404).json({
        error: 'No teachers found',
        status: 404,
      });
    }
    res.status(200).json({
      teachers,
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

exports.postNewTeacher = async (req, res) => {
  const { name } = req.body;
  const validErrors = validationResult(req);

  if (!validErrors.isEmpty()) {
    return res.status(400).json({
      error: 'Some fields are empty!',
      status: 400,
    });
  }

  const teacher = new Teacher({
    name,
    subjects: [],
  });

  try {
    await teacher.save();
    res.status(200).json({
      message: 'Teacher created successfully!',
      error: false,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Something went wront on the server!',
      status: 500,
    });
  }
};
