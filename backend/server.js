const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/relations')
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

// Profile Detail Schema
const profileDetailSchema = new mongoose.Schema({
    img: String,
    name: String,
    email: String,
    domain: String,
    visitedDate: String,
    companyName: String,
    phoneNumber: Number,
    Detail: String,
    linkedIn: String
});

// Profile Detail Model
const ProfileDetail = mongoose.model('ProfileDetail', profileDetailSchema);

const visitorDetailSchema = new mongoose.Schema({
    guestName: String,
    eventName: String,
    date: String
});

// Event Detail Model
const VisitorDetail = mongoose.model('VisitorDetail', visitorDetailSchema, 'visitors');

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Profile Detail APIs
app.get('/profiledetails', async (req, res) => {
    try {
        const profileDetails = await ProfileDetail.find();
        res.json(profileDetails);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/profiledetails', async (req, res) => {
    const { img, name, email, domain, visitedDate, companyName, phoneNumber, Detail, linkedIn } = req.body;
    const profileDetail = new ProfileDetail({
        img,
        name,
        email,
        domain,
        visitedDate,
        companyName,
        phoneNumber: Number(phoneNumber), 
        Detail,
        linkedIn
    });

    try {
        const newProfileDetail = await profileDetail.save();
        res.status(201).json(newProfileDetail);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/profiledetails/:id', async (req, res) => {
    try {
        const result = await ProfileDetail.findByIdAndUpdate(req.params.id, req.body, { new: true });
        result ? res.status(200).json(result) : res.status(404).json({ message: 'Visitor not found' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/profiledetails/:id', async (req, res) => {
    try {
        const deletedProfile = await ProfileDetail.findByIdAndDelete(req.params.id);
        if (deletedProfile) {
            res.status(200).json({ message: 'Profile deleted' });
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.get('/visitors', async (req, res) => {
    try {
        const visitors = await VisitorDetail.find();
        res.json(visitors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/visitors', async (req, res) => {
    const { guestName, eventName, date } = req.body;
    const visitorDetail = new VisitorDetail({
        guestName,
        eventName,
        date
    });

    try {
        const newVisitorDetail = await visitorDetail.save();
        res.status(201).json(newVisitorDetail);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/visitors/:id', async (req, res) => {
    try {
        const updatedVisitor = await VisitorDetail.findByIdAndUpdate(req.params.id, req.body, { new: true });
        updatedVisitor ? res.status(200).json(updatedVisitor) : res.status(404).json({ message: 'Visitor not found' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/visitors/:id', async (req, res) => {
    try {
        const deletedVisitor = await VisitorDetail.findByIdAndDelete(req.params.id);
        deletedVisitor ? res.status(200).json({ message: 'Visitor deleted' }) : res.status(404).json({ message: 'Visitor not found' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
    username: { type: String, required: true }
});

const User = mongoose.model('LoginDetail', userSchema, 'logindetail');

app.get('/logindetails', async (req, res) => {
    try {
        const loginDetail = await User.find();
        res.json(loginDetail);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/logindetails', async (req, res) => {
    const { email, pass, username } = req.body;

    if (!email || !pass || !username) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists!' });
        }
        const newUser = new User({ email, pass, username });
        await newUser.save();
        
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
