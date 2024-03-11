const express = require('express');
const app = express();
const port = 3000;
const portMessage = "This app is running on the port:";
const errorMessage = 'Error during server creating';
const runStatus = 200;
const errorStatus = 404;
const redirectedStatus = 300;


//Creat a Middleware to show the request times for each request.
app.use((req, res, next) => {
    console.log("Time of requesting: " + Date().toString());
    next();
});

//get home
app.get('/home', (req, res, next) => {
    res.status(`${runStatus}`).sendFile('/html/home.html', { root: __dirname});   
});

//get about-me
app.get('/about-me', (req, res) => {
    res.status(`${runStatus}`).sendFile('/html/aboutMe.html', { root: __dirname});   

});


//redirected user when he want to access on the root
app.get('/', (req, res) => {
    res.status(`${redirectedStatus}`).redirect('/home');   
});

//creat Middleware to serve when user try to enter a wrong url
app.use((req, res) => {
    res.status(`${errorStatus}`).sendFile('/html/error.html', { root: __dirname});   
})

app.listen(port, () => {
    console.log(`${portMessage} ${port}`);
});
// console.log(`${errorMessage}`);