const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const connectDB = require('./config/db');
const path = require('path');


// init middleware
app.use(express.json({ extended: false }));
// Connect Database
connectDB();



//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => { res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')) });
}




app.listen(PORT, () => { console.log(`Server Started on port ${PORT}`) });