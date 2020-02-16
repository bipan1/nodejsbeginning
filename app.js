const express = require('express');
const app = express(); //nodeJs framework 
const morgan = require('morgan'); //loggiing middleware which logs information for every request. 
const bodyParser = require('body-parser') //parse the body of request as per we need it. 
const mongoose = require('mongoose'); //mongoDB connecting library.

const productRoutes = require('./api/routes/products'); //importing the paths
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

//nodemon : for automatically restaring the server on every save of the project code. 

mongoose.connect(
    'mongodb+srv://bipan123:bipan123@cluster0-jfn4b.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     if(req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({})
//     }
// });

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    }) 
})

module.exports = app; 
