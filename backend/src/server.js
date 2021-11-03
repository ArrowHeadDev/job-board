
// Different modules needed to be include
const express = require("express");
const dotenv = require('dotenv');

const dayjs = require('dayjs');

// Cors for the crossOriginRequest - Helmet to secure the HTTP Headers
const cors = require("cors");
const helmet = require ('helmet');
const cookieParser = require('cookie-parser');

// Router and Middleware to include 
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');

// Each tables route 
const peopleRouter = require('./routes/people.route');
const advertisementRouter = require('./routes/advertisement.route');

const companyRouter = require('./routes/company.route');
const jobAppRouter = require('./routes/jobApp.route');
const uploadRouter = require('./routes/upload.route');

const corsOptions = {
    credentials: true,
    origin: true
  };

  
// Init express
const app = express();

// Init environment
dotenv.config();
// The use of cookies with express handle management
app.use(cookieParser());
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors(corsOptions));
// Enable pre-flight
app.options("*", cors());

// Enable helmet for secure HTTP Headers leaking
app.use(helmet());

app.use('/upload',express.static(__dirname + '/../upload'));

const port = Number(process.env.PORT || 3331);

app.use(`/api/` , peopleRouter);
app.use(`/api/`, advertisementRouter);
app.use(`/api/`, companyRouter);
app.use(`/api/`, jobAppRouter);
app.use(`/api`, uploadRouter);

app.get('/api/logout', (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token){
        throw new HttpException(404, `Not loggedIn can't logout my guy!`);
    }
        return res
        .clearCookie("access_token")
        .status(200)
        .json({message: "Successfully logged out!"})
    
});

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});


// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () =>
    console.log(`🚀 Server running on port ${port}!`));


module.exports = app;