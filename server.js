// initializing the server using express
// requiring the "express" package and assigning whatever is in that package to this variable
const express = require('express');  

// defining a backend app 
const app = express();

// to make an app listen, we need to provide one parameter, the port
// the port is a subdirectory of an IP address
const PORT = 8383;


// defining some data
let data = ["Radimir"];


// Middleware -> it's a function that gets executed between the request and the response
app.use(express.json());



// listening for incoming requests
// the code in the arrow function gets executed once the server is running
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});




// These are website endpoints (they are specifically for sending back html and they come when a user enters a url in the browser)
// next step -> add some HTTP verbs and routes (or paths)
// we invoke the get method, the first argument is the route '/'
// the second argument is an arrow function that takes two parameters, request and response
app.get('/', (req, res) => {
    console.log("User requested the homepage website")

    // adding html elements to the site
   res.send(`
    <body style="background:lightgreen; color:blue">
        <h1>DATA</h1>
        <p>${JSON.stringify(data)}</p>
        <a href="/dashboard">Dashboard</a>
    </body>
    <script>console.log("This is the script")</script>
    `) 
}); 

app.get("/dashboard", (req, res) => {
    res.send(`
        <body>
            <h1>Dashboard</h1>
            <a href="/">Home</a>
        </body>`);
})


// API endpoints (they happen when you type in your username and hit submit, that sends the same network request to the backend) 
// CRUD Actions -> Create, Read, Update, Delete, these are the 4 actions that control the data modifications
// Read -> it's the GET request
// Create -> POST req
// Update -> PUT req
// Delete -> DELETE req
app.get("/api/data", (req, res) => {
    res.send(data);
})

// if someone posts some data, it's going to be sent to the /api/data route
// with express, when someone sends information, usually is formatted as JSON
app.post("/api/data", (req, res) => {

    // the body of the request is the data associated with that request
    const newEntry = req.body;
    console.log(newEntry);

    // get the newEntry name and push it to the data array
    data.push(newEntry.name);

    res.sendStatus(201);
});


app.delete("/api/data", (req, res) => {

    // pop an element off the end of the array 
    data.pop();
    console.log("Successfully deleted the element from the end of the array");
    res.sendStatus(203);
}); 
