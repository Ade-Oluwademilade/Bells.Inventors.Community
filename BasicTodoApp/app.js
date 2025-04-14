const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoLists = require('./models/TodoLists');
const dotenv = require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


// Connecting to Mongo Database
mongoose.connect('mongodb://localhost:27017/TodoApp')

// Routes
app.get('/', async (req, res) => {
    const lists = await todoLists.find();
    res.render('index', { lists });
});

app.get('/new', (req, res) => {
    res.render('new');
});

app.post('/create', async (req, res) => {
    const { todoName, todoDate } = req.body;
    await todoLists.create({ todoName, todoDate });
    res.redirect('/');
});

app.get('/edit/:id', async(req, res) => {
    const list = await todoLists.findById(req.params.id)
    res.render('edit', { list });
});

app.post('/update/:id', async (req, res) => {
    const { todoName, todoDate } = req.body;
    await todoLists.findByIdAndUpdate(req.params.id, { todoName, todoDate });
    res.redirect('/');
});

app.post('/delete/:id', async (req, res) => {
    await todoLists.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.post('/done/:id', async (req, res) => {
    const list = await todoLists.findById(req.params.id);
    await todoLists.findByIdAndUpdate(req.params.id, { completed: !list.completed });
    res.redirect('/');
});

app.listen(process.env.PORT, () => {
    console.log('Server is already running on port ' + process.env.PORT);
});