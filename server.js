const express = require('express');

const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/users', require('./routes/users'))

app.listen(3000, () => console.log('Server is up and running'))