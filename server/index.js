const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
//require statement below have to be in this order or will error-out.
require('./models/user');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express(
    //set cookie expire to 30 days
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());



require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
