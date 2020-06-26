exports.showError = (req, res) => {
  res.status(404).json({
    error: 'No such a method, see docs:',
    status: 404,
  });
};
