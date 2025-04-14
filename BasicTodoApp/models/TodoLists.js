const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    todoName: String,
    todoDate: Date,
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('todoLists', listSchema);