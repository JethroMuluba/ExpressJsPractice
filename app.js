const express = require('express');
const app = express();
const port = 3000;
const portMessage = "This app run on the port:";
const clientMessage = 'Welcome To My Trying App';
const errorMessage = 'Error during server creating';
const runStatus = 200;


app.get('/', (req, res, next) => {
    res.status(`${runStatus}`).sendFile('/html/home.html', { root: __dirname});   
});

app.get('/about-me', (req, res) => {
    res.status(`${runStatus}`).sendFile('/html/aboutMe.html', { root: __dirname});   

});


app.use((req, res) => {
    res.status(`${runStatus}`).sendFile('/html/error.html', { root: __dirname});   
})

app.listen(port, () => {
    console.log(`${portMessage} ${port}`);
});
console.log(`${errorMessage}`);