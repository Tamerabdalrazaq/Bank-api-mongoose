const express = require('express');
var cors = require('cors');
require('./data/mongoose')

const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())

app.use('/api/users', require('./routes/users'))

app.listen(5000, () => console.log('Server is up and running'))


// requests examples: 
// GET: http://localhost:3000/api/users OR http://localhost:3000/api/users/:id
// POST: http://localhost:3000/api/users, Request body: {"id": "123456789" [, "cash": 0, "credit": 0]}
// PUT: http://localhost:3000/api/users/:id?action=['withdraw', 'deposit', 'updateCredit']
// PUT: http://localhost:3000/api/users/:id(from)?action=transfer, Request body: {"id"(to): "123456789", "cash": 0}