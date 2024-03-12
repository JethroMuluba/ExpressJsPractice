const express = require('express');
const app = express();
const port = 3000;
const messagesArray = [
    {
        portMessage : "This app is running on the port:",
        errorMessage : 'An error has occurred!',
        pageNoFoundMessageforExperience : "Experiences Not Found",
    }
];

const statusArray = [
    {
        runStatus : 200,
        redirectedStatus : 300,
        pageNoFundStatus : 404,
        errorStatus : 500,
    }
];

const experiences = require('./model/experciences.json');

const morgan = require ('morgan');

//Middleware of application
const loggerMiddleware = (req, res, next) => {
    console.log('Request received to: '+ req.url);
    next();
};

app.use(loggerMiddleware);


//Creat a Middleware that return static contents from public folder.
app.use(express.static('public'));


//Creat a Middleware to show the request times for each request.
app.use((req, res, next) => {
    console.log("Time of requesting: " + Date().toString());
    next();
});

//Creat a Middleware with morgan
app.use(morgan('dev'))

//get home
app.get('/home', (req, res, next) => {
    res.status(`${statusArray[0].runStatus}`).sendFile('/html/home.html', { root: __dirname});   
});


//Creat Middleware specifical to authenticat user before to access in about rout
const authMiddleware = (req, res, next) => {
    const userAuthenticated = [
        {
            userName : 'jethroMuluba',
            password :1234,
        },
    ];

    //check user authenticated
    if (userAuthenticated[0].userName === 'jethroMuluba' && userAuthenticated[0].password === 1234 ) {
        next();
    } else {
        res.send('Access refused')
    }
}
//get about-me
app.get('/about-me', authMiddleware, (req, res) => {
    res.status(`${statusArray[0].runStatus}`).sendFile('/html/aboutMe.html', { root: __dirname});   

});

//Creat Experiences rout
app.get('/experiencrs/:id', (req, res) => {
    const id = req.params.id;
    const fetchExperiences = experiences.find(experience => experience.id == id);
        if(fetchExperiences) {
            res.status(`${statusArray[0].runStatus}`).json(fetchExperiences);
        } else {
            res.status(`${statusArray[0].pageNoFundStatus}`).send(`${messagesArray[0].pageNoFoundMessageforExperience}`)
        }

})



//redirected user when he want to access on the root
app.get('/', (req, res) => {
    res.status(`${statusArray[0].redirectedStatus}`).redirect('/home');   
});

//creat Middleware to serve when user try to enter a wrong url
app.use((req, res) => {
    res.status(`${statusArray[0].pageNoFundStatus}`).sendFile('/html/pageNoFund.html', { root: __dirname});   
})

//Creat Middleware to display error message
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(`${statusArray[0].errorStatus}`).send(`${messagesArray[0].errorMessage}`)
})

app.listen(port, () => {
    console.log(`${messagesArray[0].portMessage} ${port}`);
});
// console.log(`${errorMessage}`);