const mongoose = require('mongoose')
const User = mongoose.model('User', {
    credit: {
        type: Number,
        default: 0,
    },
    cash: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: false,
    }
})

module.exports = User;