// Dependencies
const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/assets'))
let tableNumber = 1;

// on sendResBtn click { send res & tableNumber++}
// if tables.length > 5 {send new Table to waitlist JSON}

//Reservations
const reservations = [];

//Tables 
//Tables equal reservations.seated = true
const tables = []

//Waitlist 
//Waitlist equal reservations.seated = false
const waitlist = []




app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})
app.get('/reserve.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'reserve.html'));
})

// Displays all characters
app.get('/api/reservations', (req, res) => {
    res.json(reservations);
})

// Displays a single character, or returns false
app.get('/api/reservations/:table', (req, res) => {
    const chosen = req.params.table;
    console.log(chosen);
})

// Create New Characters - takes in JSON input
app.post('/api/reservations', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newTable = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newTable.uid = newTable.uid.replace(/\s+/g, '').toLowerCase();
    console.log('newTable.routename=', newTable.uid);

    reservations.push(newTable);
    res.json(newTable);
});


// Starts the server to begin listening

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
})