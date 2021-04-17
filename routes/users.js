const express = require('express');
const fs = require('fs');
const path = require('path')
const {getUsers, handleAction} = require('./routesUtils');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/users.json')

// Get all users
router.get('/', (req, res) => {
    res.json(getUsers());
})

// Get user by id
router.get('/:id', (req, res) => {
    let movies = getUsers();
    const searched = movies.find(movie => movie.id === req.params.id);
    if(!searched) return res.status(400).json({Error: `Cannot find ${req.params.id}`})
    res.json(searched);
})

// Create user
router.post('/', (req, res) => {
    let users = getUsers();
    if(!req.body.id) return res.send('Please provide user id');
    if(users.find(user => user.id === req.body.id)) res.send('this user already exists');
    const newMovie = {credit: 0, cash: 0, ...req.body};
    users.push(newMovie);
    fs.writeFileSync(dataPath, JSON.stringify(users));
    res.json(users);
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