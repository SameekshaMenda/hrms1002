// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a schema and model for Attendance
const attendanceSchema = new mongoose.Schema({
    employee: String,
    date: String,
    status: String,
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

// Routes
app.get('/api/attendance', async (req, res) => {
    const records = await Attendance.find();
    res.json(records);
});

app.post('/api/attendance', async (req, res) => {
    const records = req.body;
    await Attendance.insertMany(records);
    res.status(200).json({ message: 'Records added' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
