const mongoose = require('mongoose');
const Student = require('../models/student');
const Group = require('../models/group');

const { validationResult } = require('express-validator');

exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(
      mongoose.Types.ObjectId(req.params.id)
    );
    if (!student) {
      return res.status(404).json({
        error: 'Student not found',
        status: 404,
      });
    }
    res.status(200).json({
      student,
      error: false,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Something went wrong on the server!',
      status: 500,
    });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    if (students.length < 1) {
      return res.status(404).json({
        error: 'No students found',
        status: 404,
      });
    }
    res.status(200).json({
      students,
      error: true,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Something went wront on the server!',
      status: 500,
    });
  }
};

exports.patchStudent = async (req, res) => {
  const { name } = req.body;
  try {
    const student = await Student.findById(
      mongoose.Types.ObjectId(req.params.id)
    );
    if (!student) {
      return res.status(404).json({
        error: 'Student not found',
        status: 404,
      });
    }

    student.name = name;
    await student.save();

    res.status(200).json({
      message: 'Student updated successfully',
      error: false,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Something went wrong on the server!',
      status: 500,
    });
  }
};

exports.postNewStudent = async (req, res) => {
  const { name, group } = req.body;
  const validErrors = validationResult(req);

  if (!validErrors.isEmpty()) {
    return res.status(400).json({
      error: 'Some fields are empty!',
      status: 400,
    });
  }

  const student = new Student({
    name,
    group,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await Group.updateOne({ _id: group }, { $push: { students: student } });
    await student.save({ session: sess });
    await sess.commitTransaction();
    res.status(201).json({
      message: 'Student created successfully!',
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

exports.deleteStudent = async (req, res) => {
  const validErrors = validationResult(req);

  if (!validErrors.isEmpty()) {
    return res.status(400).json({
      error: 'Some fields are empty!',
      status: 400,
    });
  }

  const { id } = req.params;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({
        error: 'Student not found',
        status: 404,
      });
    }
    await Group.updateOne({ student: id }, { $pull: { students: id } });
    await student.remove();
    res.status(201).json({
      message: 'Student was deleted!',
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
