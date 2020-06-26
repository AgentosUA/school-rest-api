const mongoose = require('mongoose');
const Group = require('../models/group');

const { validationResult } = require('express-validator');

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    if (groups.length < 1) {
      return res.status(404).json({
        error: 'No groups found',
        status: 404,
      });
    }
    res.status(200).json({
      groups,
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

exports.postNewGroup = async (req, res) => {
  const { title } = req.body;
  const validErrors = validationResult(req);

  if (!validErrors.isEmpty()) {
    return res.status(400).json({
      error: 'Some fields are empty!',
      status: 400,
    });
  }

  const isGroupExists = await Group.findOne({ title });
  if (isGroupExists) {
    return res.status(403).json({
      error: 'Group already exists!',
      status: 403,
    });
  }

  const group = new Group({
    title,
    students: [],
    lessons: [],
  });

  try {
    await group.save();
    res.status(201).json({
      message: 'Group created successfully!',
      error: false,
      status: 201,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Something went wrong on the server!',
      status: 500,
    });
  }
};

exports.deleteGroup = async (req, res) => {
  const { id } = req.body;
  const validErrors = validationResult(req);

  if (!validErrors.isEmpty()) {
    return res.status(400).json({
      error: 'Some fields are empty!',
      status: 400,
    });
  }

  try {
    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({
        error: 'Group not found',
        status: 404,
      });
    }

    await group.remove();
    res.status(201).json({
      message: 'Group was deleted!',
      error: false,
      status: 201,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Something went wrong on the server!',
      status: 500,
    });
  }
};
