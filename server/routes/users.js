const express = require('express');
const fs = require('fs');
const path = require('path')
const {getUsers, handleAction} = require('./routesUtils');
const router = express.Router();
const User = require('../data/models')

const dataPath = path.join(__dirname, '../data/users.json')

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users);
})

// Get user by id
router.get('/:id', async (req, res) => {
    const searched = await User.find({_id: req.params.id});
    res.json(searched);
})

// Create user
router.post('/', async(req, res) => {
    const user = new User(req.body);
    try{
        const response =await user.save();
        res.send(response)
    } catch(err){
        console.log(err);
    }
})

// Update user by id
router.put('/:id', (req, res) => {
    console.log(req.query);
    if(!req.query.action){
        return res.status(400).json({error: `Please provide an action parameter`, 
        possibleActions:['deposit', 'updateCredit', 'withdraw', 'transfer']})
    }
    handleAction(req.params.id, req.query, req.body, res)
})

router.delete('/:id', (req, res) => {
    let movies = getUsers();
    console.log(movies);
    const searched = movies.findIndex(movie => movie.id === req.params.id);
    if(searched < 0) return res.status(400).json({Error: `Cannot find ${req.params.id}`});
    movies.splice(searched, 1);
    fs.writeFileSync(dataPath, JSON.stringify(movies));
    res.json(movies);
})

module.exports = router;