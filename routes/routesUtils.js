const users = require('../data/users.json');
const fs = require('fs')
const path = require('path')

const dataPath = path.join(__dirname, '../data/users.json')


function handleAction(id, query, reqBody, res){
    let users = getUsers();
    const userIndex = users.findIndex(movie => movie.id === id);
    if(userIndex < 0) return res.status(400).json({Error: `Cannot find ${id}`});
    switch (query.action){
        case('deposit'):
            deposit(reqBody, res, users, userIndex);
            break;
        case('transfer'):
            transfer(reqBody, res, users, userIndex);
            break;
        case('withdraw'):
            withdraw(reqBody, res, users, userIndex);
            break;
        case('updateCredit'):
            updateCredit(reqBody, res, users, userIndex);
            break;
    }
}

function deposit(requestObj, res, users, userIndex){
    if(!requestObj.cash) return res.json({error: 'please provide amount of cash', example:{cash: 400}})
    users[userIndex].cash = parseInt(users[userIndex].cash) + parseInt(requestObj.cash);
    fs.writeFileSync(dataPath, JSON.stringify(users));
    res.json(users);
}

function withdraw(requestObj, res, users, userIndex){
    if(!requestObj.cash) return res.json({error: 'please provide amount of cash', example:{cash: 400}})
    users[userIndex].cash = parseInt(users[userIndex].cash) - parseInt(requestObj.cash);
    fs.writeFileSync(dataPath, JSON.stringify(users));
    res.json(users);
}

function updateCredit(requestObj, res, users, userIndex){
    if(!requestObj.credit) return res.json({error: 'please provide credit', example:{credit: 400}})
    users[userIndex].credit = parseInt(requestObj.credit);
    fs.writeFileSync(dataPath, JSON.stringify(users));
    res.json(users);
}

function transfer(requestObj, res, users, userIndex){
    const target = users.findIndex(movie => movie.id === requestObj.id);
    if(!requestObj.id || !requestObj.cash) return res.status(400).json({Error: `please provide a valid body`, 
    example: {id:"123456789", cash: 500}});
    if(target < 0) return res.status(400).json({Error: `Cannot find ${requestObj.id}`});
    if(isNaN(requestObj.cash)) return res.status(400).json({Error: `please enter a valid number`});
    if(users[userIndex].cash < requestObj.cash) return res.status(400).json({error: 'There is no enough balance'});
    users[userIndex].cash = parseInt(users[userIndex].cash) - parseInt(requestObj.cash);
    users[target].cash = parseInt(users[target].cash) + parseInt(requestObj.cash);
    fs.writeFileSync(dataPath, JSON.stringify(users));
    res.json(users);
}

function getUsers(){
    let users;
    try{
        users = fs.readFileSync(dataPath);
        users = JSON.parse(users.toString());
    } catch(e){
        users = [];
        fs.writeFileSync(dataPath, JSON.stringify(users))
    }
    return users
}

module.exports = {handleAction, getUsers};