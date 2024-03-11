const express = require('express');
const app = express();


app.get('/', (req, res, next) => {
    res.send('Welcome To My Trying App')    
})

app.listen(4000, () => {
    console.log('This app run on the port 4000');
});
console.log('Error during server creating');