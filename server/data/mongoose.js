const mongoose = require('mongoose');
console.log('hi');
mongoose.connect('mongodb://127.0.0.1:27017/bankAPI', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
})