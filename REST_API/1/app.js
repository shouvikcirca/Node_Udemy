const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');   
const mongoose  =require('mongoose');
const path = require('path')

const feedRoutes = require('./routes/feed');


const app = express();

const fielStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype == 'image/jpeg')
    {
        cb(null, true);
    }
    else
    {
        cb(null, false);
    }
}

app.use(bodyParser.json());
app.use(multer({storage: fielStorage, fileFilter: fileFilter}).single('image')); // Registering multer

app.use('/images', express.static(path.join(__dirname, 'images')));


// For dealing with CORS errors 
// The * allow access t0 any client but we can restrict it to certain websites if we want  
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '  *'); // Telling which websites are allowed as clients
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // Telling which methods are allowed by the client
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Tells what headers clients can set on their requests
    next();
})

app.use('/feed', feedRoutes);


app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    return res(status).json({
        message: message
    });
});

// In the below URL, messages is the name of the database
mongoose.connect(
    'mongodb+srv://s4ouvik:microwis@cluster0.czjrh.mongodb.net/messages?retryWrites=true&w=majority'
)
.then(result => {
    app.listen(8080);
})
.catch(err => console.log(err))

    

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