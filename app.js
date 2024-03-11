const express = require('express');
const app = express();
const port = 3000;
const portMessage = "This app run on the port:";
const clientMessage = 'Welcome To My Trying App';
const errorMessage = 'Error during server creating';


app.get('/', (req, res, next) => {
    res.send(`${clientMessage}`)    
})

app.listen(port, () => {
    console.log(`${portMessage} ${port}`);
});
console.log(`${errorMessage}`);