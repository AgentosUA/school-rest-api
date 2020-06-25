const mongoose = require('mongoose');

const DBConnect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-3fy9f.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.log('Something went wrong with DB connection!');
    process.exit();
  }
};

module.exports = DBConnect;
