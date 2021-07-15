const express = require('express');
const bodyParser = require('body-parser');
const feedRoutes = require('./routes/feed');


const app = express();

app.use(bodyParser.json());

// For dealing with CORS errors 
// The * allow access t0 any client but we can restrict it to certain websites if we want  
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '  *'); // Telling which websites are allowed as clients
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // Telling which methods are allowed by the client
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Tells what headers clients can set on their requests
    next();
})

app.use('/feed', feedRoutes);
app.listen(8080);


/*
Syntax for fetch API 

**** GET ****
fetch('https://localhost:8080/feed/posts')
.then(res => res.json())
.then(resData => console.log(resData))
.catch(err => console.log(err));


**** POST ****
fetch('https://localhost:8080/feed/posts', {
    method:'POST',
    body: JSON.stringify({
        title: "Dune",
        content: "Fear Is The Mind Killer"
    }),
    headers: {
        'Content-Type':'application/json'
    }
})
.then(res  => res.json())
.then(resData => console.log(resData))
.catch(err => console.log(err));


*/