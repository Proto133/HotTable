// Dependencies
const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
let PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/assets'))
let tableNumber = 1;



//Reservations
const data = {
    reservations: [],
    waitlist: [],

};


// Routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

// app.get('/index.html', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// })
app.get('/reserve', (req, res) => {
    res.sendFile(path.join(__dirname, 'reserve.html'));
})
app.get('/tables', (req, res) => {
    res.sendFile(path.join(__dirname, 'tables.html'));
})
app.get('/waitlist', (req, res) => {
    res.sendFile(path.join(__dirname, 'waitlist.html'))
})


//API get data
//Returns both the tables array and the waitlist array
app.get("/api/", function(req, res) {
    res.json(data);
});

app.get('/api/reservations', (req, res) => {
    res.json(data.reservations);
})

app.get('/api/waitlist', (req, res) => {
    res.json(data.waitlist);
})

// Create New RESERVTIONS- takes in JSON input
app.post('/api/reservations', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newTable = req.body;
    if (newTable && newTable.name)
        newTable.uid = newTable.uid.replace(/\s+/g, '').toUpperCase();
    if (data.reservations.length < 5) {
        data.reservations.push(newTable);
    } else {
        data.waitlist.push(newTable);
        data.waitlist.seated = false;
    }

    res.json(newTable);
});

// Get new table data entry from POST
app.post("/api/new", function(req, res) {
    let tableData = req.body;
    if (data.reservations.length < 5) {
        tableData.seated = true;
        data.reservations.push(tableData);
    } else {
        tableData.seated = false;
        data.waitlist.push(tableData);
    }

    console.log('tableData:', tableData);

    res.json(tableData);
});



app.get("/api/remove/:id?", function(req, res) {
    let tableId = req.params.id;
    console.log('tableId: \n', tableId);
    if (tableId) {
        for (let i = 0; i < data.reservations.length; i++) {
            if (tableId === data.reservations[i].uid) {
                data.reservations.splice(i, 1);
                if (data.waitlist.length > 0) {
                    let tempTable = data.waitlist.splice(0, 1)[0];
                    data.reservations.push(tempTable);
                }

                return res.json(true);
            }
        }
        for (let i = 0; i < data.waitlist.length; i++) {
            if (tableId === data.waitlist[i].uid) {
                data.waitlist.splice(i, 1);

                return res.json(true);
            }
        }
        return res.json(false);
    }
    return res.json(false);
});

// Starts the server to begin listening
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
})