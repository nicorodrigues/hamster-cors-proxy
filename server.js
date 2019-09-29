const express = require('express');
const app = express();

/*
Routes
*/
require('./routes')(app, express)

/*
Up, up, and away, away!
*/
app.listen(process.env.PORT || 3344, () => console.log(`Server up! Port: ${process.env.PORT || 3344}`) );